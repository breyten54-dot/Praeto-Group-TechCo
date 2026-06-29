document.addEventListener('DOMContentLoaded', () => {
  // === Dynamic year ===
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // === Mobile menu ===
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // === Conditional "Other" input ===
  const otherCheckbox = document.getElementById('appTypeOtherCheck');
  const otherInput = document.getElementById('appTypeOther');

  if (otherCheckbox && otherInput) {
    otherCheckbox.addEventListener('change', () => {
      otherInput.disabled = !otherCheckbox.checked;
      if (otherCheckbox.checked) {
        otherInput.focus();
      } else {
        otherInput.value = '';
      }
    });
  }

  // === Form validation & submission ===
  const form = document.getElementById('projectForm');
  const successSection = document.getElementById('success');
  const questionnaireSection = document.getElementById('questionnaire');
  const backHomeBtn = document.getElementById('backHome');

  const requiredFields = [
    { id: 'companyName', messageId: 'companyNameError' },
    { id: 'industry', messageId: 'industryError' },
    { id: 'businessDescription', messageId: 'businessDescriptionError' },
    { id: 'projectGoal', messageId: 'projectGoalError' },
    { id: 'targetAudience', messageId: 'targetAudienceError' },
    { id: 'contactName', messageId: 'contactNameError' },
    { id: 'email', messageId: 'emailError', type: 'email' },
  ];

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearError(group) {
    group.classList.remove('has-error');
  }

  function showError(group) {
    group.classList.add('has-error');
  }

  function validateField(fieldDef) {
    const input = document.getElementById(fieldDef.id);
    const group = input?.closest('.form-group');
    if (!input || !group) return false;

    let valid = input.value.trim() !== '';
    if (valid && fieldDef.type === 'email') {
      valid = validateEmail(input.value.trim());
    }

    if (valid) {
      clearError(group);
    } else {
      showError(group);
    }
    return valid;
  }

  requiredFields.forEach((field) => {
    const input = document.getElementById(field.id);
    if (!input) return;
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        clearError(input.closest('.form-group'));
      }
    });
    input.addEventListener('blur', () => validateField(field));
  });

  function validateCheckboxGroup(groupId, errorId) {
    const group = document.getElementById(groupId);
    const errorEl = document.getElementById(errorId);
    if (!group || !errorEl) return false;

    const checked = group.querySelectorAll('input[type="checkbox"]:checked').length > 0;
    const parent = group.closest('.form-group');

    if (checked) {
      parent.classList.remove('has-error');
    } else {
      parent.classList.add('has-error');
    }
    return checked;
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let allValid = true;

      requiredFields.forEach((field) => {
        if (!validateField(field)) {
          allValid = false;
        }
      });

      if (!validateCheckboxGroup('appTypeGroup', 'appTypeError')) {
        allValid = false;
      }

      if (!allValid) {
        const firstError = form.querySelector('.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Gather form data (replace with backend/API submission when ready)
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      data.appType = formData.getAll('appType');
      data.techStack = formData.getAll('techStack');

      console.log('Project brief submitted:', data);

      // Show success state
      form.reset();
      if (otherInput) {
        otherInput.disabled = true;
      }

      if (questionnaireSection && successSection) {
        questionnaireSection.hidden = true;
        successSection.hidden = false;
        successSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (backHomeBtn) {
    backHomeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (questionnaireSection && successSection) {
        successSection.hidden = true;
        questionnaireSection.hidden = false;
        questionnaireSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
});
