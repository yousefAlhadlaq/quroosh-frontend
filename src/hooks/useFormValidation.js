import { useState } from 'react';

/**
 * Custom hook for form validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function that returns errors object
 */
export const useFormValidation = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });

    // Validate single field on blur
    if (validate) {
      const fieldErrors = validate(values);
      if (fieldErrors[name]) {
        setErrors({
          ...errors,
          [name]: fieldErrors[name]
        });
      }
    }
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();

    // Validate all fields
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(allTouched);

      // If no errors, submit the form
      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values);
      }
    } else {
      onSubmit(values);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues
  };
};

// Common validation rules
export const validators = {
  required: (value) => {
    return value ? '' : 'This field is required';
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? '' : 'Invalid email address';
  },

  minLength: (min) => (value) => {
    return value.length >= min ? '' : `Must be at least ${min} characters`;
  },

  maxLength: (max) => (value) => {
    return value.length <= max ? '' : `Must be at most ${max} characters`;
  },

  match: (fieldName, message) => (value, values) => {
    return value === values[fieldName] ? '' : message || 'Fields do not match';
  },

  number: (value) => {
    return !isNaN(value) && value !== '' ? '' : 'Must be a valid number';
  },

  positiveNumber: (value) => {
    return !isNaN(value) && parseFloat(value) > 0 ? '' : 'Must be a positive number';
  }
};

export default useFormValidation;
