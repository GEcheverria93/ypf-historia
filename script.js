/* script.js
   Handles modal behavior for timeline cards: open modal with full image and content when a card is clicked.
*/

(function () {
    'use strict';

    const modal = document.getElementById('cardModal');
    const modalImg = modal.querySelector('.modal-image img');
    const modalYear = modal.querySelector('.modal-year');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalMore = modal.querySelector('.modal-more');
    const modalCloseBtn = modal.querySelector('.modal-close');

    let lastFocusedEl = null;

    function openModal(card) {
        // Get data from the card
        const imgEl = card.querySelector('.card-image img');
        const titleEl = card.querySelector('.card-title');
        const descEl = card.querySelector('.card-description');
        const yearEl = card.querySelector('.card-year');

        modalImg.src = imgEl ? imgEl.src : '';
        modalImg.alt = imgEl ? imgEl.alt : '';
        modalYear.textContent = yearEl ? yearEl.textContent : '';
        modalTitle.textContent = titleEl ? titleEl.textContent : '';
        modalDescription.textContent = descEl ? descEl.textContent : '';
        // Use dataset.detail for a short extra sentence, if provided
        modalMore.textContent = card.dataset.detail ? card.dataset.detail : '';
        // update aria-describedby: point to both description and more (if present)
        const ids = ['modal-description'];
        if (card.dataset.detail) ids.push('modal-more');
        modal.setAttribute('aria-describedby', ids.join(' '));

        // Show modal
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Save focus
        lastFocusedEl = document.activeElement;
        modalCloseBtn.focus();
    }

    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('aria-describedby', 'modal-description');
        document.body.style.overflow = '';
        // optional: clear content
        modalImg.src = '';
        modalImg.alt = '';
        modalYear.textContent = '';
        modalTitle.textContent = '';
        modalDescription.textContent = '';

        // Restore focus
        if (lastFocusedEl) {
            try { lastFocusedEl.focus(); } catch (e) { /* ignore */ }
            lastFocusedEl = null;
        }
    }

    // Make cards focusable and handle click/keyboard activation
    const cards = document.querySelectorAll('.timeline-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('click', () => openModal(card));
        card.addEventListener('keyup', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Space' || ev.key === 'Spacebar') { openModal(card); }
        });
    });

    // Handle overlay click (close if clicking outside content)
    function onOverlayClick(e) {
        if (e.target === modal) closeModal();
    }

    // Esc key
    function onKeyUp(e) {
        if (e.key === 'Escape') closeModal();
    }

    // Add event listeners
    modal.addEventListener('click', onOverlayClick);
    modalCloseBtn.addEventListener('click', closeModal);
    document.addEventListener('keyup', onKeyUp);

})();
