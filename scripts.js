document.addEventListener('DOMContentLoaded', () => {
  // === Dynamic year ===
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // === Intro sequence ===
  const intro = document.getElementById('intro');
  const introBinary = document.getElementById('introBinary');

  function generateBinaryRain() {
    if (!introBinary) return;
    const fragment = document.createDocumentFragment();
    const count = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.textContent = Math.random() > 0.5 ? '1' : '0';
      span.style.left = `${Math.random() * 100}%`;
      span.style.top = `${Math.random() * 100}%`;
      span.style.fontSize = `${12 + Math.random() * 14}px`;
      span.style.animationDelay = `${Math.random() * 2.5}s`;
      span.style.animationDuration = `${2 + Math.random() * 2}s`;
      fragment.appendChild(span);
    }

    introBinary.appendChild(fragment);
  }

  function endIntro() {
    if (!intro) return;
    intro.classList.add('exiting');
    document.body.style.overflow = '';
    setTimeout(() => {
      intro.hidden = true;
    }, 1100);
  }

  if (intro) {
    document.body.style.overflow = 'hidden';
    generateBinaryRain();
    setTimeout(endIntro, 5200);
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

  // === Audience branching ===
  const audienceRadios = document.querySelectorAll('input[name="audience"]');
  const customerBranch = document.querySelector('.branch[data-branch="customer"]');
  const internalBranch = document.querySelector('.branch[data-branch="internal"]');

  function getSelectedAudience() {
    return document.querySelector('input[name="audience"]:checked')?.value;
  }

  function updateBranches() {
    const audience = getSelectedAudience();

    if (customerBranch) {
      customerBranch.classList.toggle('active', audience === 'customer' || audience === 'both');
    }
    if (internalBranch) {
      internalBranch.classList.toggle('active', audience === 'internal' || audience === 'both');
    }

    // Clear errors on fields that become hidden
    ['targetAudience', 'internalTeam'].forEach((id) => {
      const input = document.getElementById(id);
      const branch = input?.closest('.branch');
      if (branch && !branch.classList.contains('active')) {
        clearError(input.closest('.form-group'));
      }
    });
  }

  audienceRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      updateBranches();
      clearError(document.getElementById('audienceGroup')?.closest('.form-group'));
    });
  });

  // === Form validation & submission ===
  const form = document.getElementById('projectForm');
  const successSection = document.getElementById('success');
  const questionnaireSection = document.getElementById('questionnaire');
  const backHomeBtn = document.getElementById('backHome');

  function getRequiredFields() {
    const base = [
      { id: 'companyName', messageId: 'companyNameError' },
      { id: 'industry', messageId: 'industryError' },
      { id: 'businessDescription', messageId: 'businessDescriptionError' },
      { id: 'projectGoal', messageId: 'projectGoalError' },
      { id: 'contactName', messageId: 'contactNameError' },
      { id: 'email', messageId: 'emailError', type: 'email' },
    ];

    const audience = getSelectedAudience();
    if (audience === 'customer' || audience === 'both') {
      base.push({ id: 'targetAudience', messageId: 'targetAudienceError' });
    }
    if (audience === 'internal' || audience === 'both') {
      base.push({ id: 'internalTeam', messageId: 'internalTeamError' });
    }
    return base;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearError(group) {
    group?.classList.remove('has-error');
  }

  function showError(group) {
    group?.classList.add('has-error');
  }

  function validateField(fieldDef) {
    const input = document.getElementById(fieldDef.id);
    const group = input?.closest('.form-group');
    if (!input || !group) return false;

    // Skip validation if the field is inside a hidden branch
    const branch = group.closest('.branch');
    if (branch && !branch.classList.contains('active')) {
      clearError(group);
      return true;
    }

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

  function attachValidationListeners() {
    const allPotentialFields = [
      { id: 'companyName', messageId: 'companyNameError' },
      { id: 'industry', messageId: 'industryError' },
      { id: 'businessDescription', messageId: 'businessDescriptionError' },
      { id: 'projectGoal', messageId: 'projectGoalError' },
      { id: 'targetAudience', messageId: 'targetAudienceError' },
      { id: 'internalTeam', messageId: 'internalTeamError' },
      { id: 'contactName', messageId: 'contactNameError' },
      { id: 'email', messageId: 'emailError', type: 'email' },
    ];

    allPotentialFields.forEach((field) => {
      const input = document.getElementById(field.id);
      if (!input) return;
      input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
          clearError(input.closest('.form-group'));
        }
      });
      input.addEventListener('blur', () => validateField(field));
    });
  }

  attachValidationListeners();

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

  function validateAudience() {
    const audienceGroup = document.getElementById('audienceGroup');
    const parent = audienceGroup?.closest('.form-group');
    if (!parent) return false;

    const selected = getSelectedAudience();
    if (selected) {
      clearError(parent);
      return true;
    } else {
      showError(parent);
      return false;
    }
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let allValid = true;

      if (!validateAudience()) {
        allValid = false;
      }

      const requiredFields = getRequiredFields();
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

      console.log('Project brief submitted:', data);

      // Show success state
      form.reset();
      if (otherInput) {
        otherInput.disabled = true;
      }
      updateBranches();

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
