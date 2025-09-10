// Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animação de entrada dos elementos
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        document.querySelectorAll('.module-card, .bonus-card, .guarantee-card').forEach(el => {
            observer.observe(el);
        });

        // Tracking de eventos (placeholder para integração com ActiveCampaign/GTM)
        function trackEvent(eventName, eventData = {}) {
            console.log('Event tracked:', eventName, eventData);
            
            // Aqui você pode adicionar integrações com:
            // - Google Analytics
            // - Facebook Pixel
            // - ActiveCampaign
            // - Outras ferramentas de tracking
            
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, eventData);
            }
        }

        // Rastrear cliques nos CTAs
        document.querySelectorAll('.btn-primary').forEach(button => {
            button.addEventListener('click', function() {
                trackEvent('cta_click', {
                    button_text: this.textContent.trim(),
                    button_location: this.closest('section').className
                });
            });
        });

        // Rastrear scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (scrollPercent % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                    trackEvent('scroll_depth', { percent: scrollPercent });
                }
            }
        });