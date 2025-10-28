document.addEventListener('DOMContentLoaded', function() {
    const step1Btn = document.getElementById('step1-btn');
    const step2Btn = document.getElementById('step2-btn');
    const saveFlushBtn = document.getElementById('save-flush-btn');
const codeLine = document.getElementById('code-line');
    const entityContainer = document.getElementById('entity-container');
    const dbContent = document.getElementById('db-content');
    const timeline = document.getElementById('timeline');
    const timelineProgress = document.getElementById('timeline-progress');
    const commitMarker = document.getElementById('commit-marker');
    const explanation = document.getElementById('explanation');
    const stepExplanation = document.getElementById('step-explanation');

    let animationTimeline;
    let entity;
    step1Btn.addEventListener('click', step1Save);
    step2Btn.addEventListener('click', step2Commit);
    saveFlushBtn.addEventListener('click', saveAndFlushDemo);
function createEntity(color = 'blue') {
        const entityEl = document.createElement('div');
        entityEl.className = `entity entity-${color}`;
        entityEl.textContent = 'E';
        return entityEl;
    }

    function showTooltip(text, element, position = 'bottom') {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;

        const rect = element.getBoundingClientRect();
        let top, left;

        switch(position) {
            case 'top':
                top = rect.top - 40;
                left = rect.left + rect.width / 2;
                tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
                break;
            case 'bottom':
                top = rect.bottom + 10;
                left = rect.left + rect.width / 2;
                tooltip.style.transform = 'translateX(-50%)';
                break;
            case 'left':
                top = rect.top + rect.height / 2;
                left = rect.left - 10;
                tooltip.style.transform = 'translateX(-100%) translateY(-50%)';
                break;
            case 'right':
                top = rect.top + rect.height / 2;
                left = rect.right + 10;
                tooltip.style.transform = 'translateY(-50%)';
                break;
        }

        tooltip.style.position = 'absolute';
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        document.body.appendChild(tooltip);

        return tooltip;
    }

    function addExplanation(step, text) {
        const stepEl = document.createElement('div');
        stepEl.className = 'p-4 bg-gray-50 rounded-lg border border-gray-200';
        stepEl.innerHTML = `
            <h3 class="font-bold text-lg mb-2 text-gray-800">Step ${step}:</h3>
            <p class="text-gray-700">${text}</p>
        `;
        stepExplanation.appendChild(stepEl);
    }
    function step1Save() {
        // Reset
        entityContainer.innerHTML = '';
        stepExplanation.innerHTML = '';
        explanation.classList.remove('hidden');
        timeline.classList.remove('hidden');
        timelineProgress.style.width = '0%';
        commitMarker.classList.remove('text-green-600');
        
        // Hide step2 button until animation completes
        step2Btn.classList.add('hidden');
        step1Btn.disabled = true;

        // Create entity and animate it into PC
        entity = createEntity();
        entityContainer.appendChild(entity);

        gsap.from(entity, {
            x: -200,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                const tooltip = showTooltip('Entity saved in Persistence Context - not yet in DB', entity);
                addExplanation(1, 'Developer calls save(). The entity is stored in the Persistence Context but not yet in the database.');
                setTimeout(() => {
                    tooltip.remove();
                    // Only show step2 button after explanation is complete
                    step2Btn.classList.remove('hidden');
                    step1Btn.disabled = false;
                }, 3000);
            }
        });
    }
    function step2Commit() {
        step2Btn.disabled = true;
        step1Btn.disabled = true;
        
        // First phase: Mark entity as dirty
        gsap.to(entity, {
            className: 'entity entity-yellow',
            duration: 0.5,
            onComplete: () => {
                const tooltip = showTooltip('Pending flush (changes not synchronized with DB)', entity);
                addExplanation(2, 'Hibernate marks the entity as dirty (changed) and needing to be flushed to the database.');
                
                // Wait before starting next animation
                setTimeout(() => {
                    tooltip.remove();
                    
                    // Second phase: Animate timeline progress
                    gsap.to(timelineProgress, {
                        width: '100%',
                        duration: 2,
                        ease: "none",
                        onComplete: () => {
                            commitMarker.classList.add('text-green-600');
                            addExplanation(3, 'Transaction commit triggers Hibernate to flush changes to the database.');
                            
                            // Third phase: Move entity to DB
                            gsap.to(entity, {
                                x: 200,
                                duration: 1,
                                ease: "power2.in",
                                onComplete: () => {
                                    entity.remove();
                                    dbContent.innerHTML = `
                                        <div class="text-center">
                                            <i data-feather="database" class="w-12 h-12 mx-auto mb-2 text-green-500"></i>
                                            <p class="text-green-600 font-medium">Data updated!</p>
                                            <div class="sql-query mt-2">UPDATE voucher_template SET claimed_count=10 WHERE id=1;</div>
                                        </div>
                                    `;
                                    feather.replace();
                                    const tooltip = showTooltip('Data synchronized with database!', dbContent, 'top');
                                    setTimeout(() => {
                                        tooltip.remove();
                                        saveFlushBtn.classList.remove('hidden');
                                        step2Btn.disabled = false;
                                        step1Btn.disabled = false;
                                    }, 3000);
                                }
                            });
                        }
                    });
                }, 3000);
            }
        });
    }
function saveAndFlushDemo() {
        // Reset for demo
        saveFlushBtn.disabled = true;
        entityContainer.innerHTML = '';
        dbContent.innerHTML = `
            <div class="text-center">
                <i data-feather="database" class="w-12 h-12 mx-auto mb-2"></i>
                <p>Waiting for changes...</p>
            </div>
        `;
        feather.replace();
        
        // Create entity
        const entity = createEntity();
        entityContainer.appendChild(entity);

        // Animation timeline with explanations
        const demoTL = gsap.timeline();
        
        demoTL
            .from(entity, {
                x: -200,
                duration: 0.5,
                ease: "power2.out",
                onStart: () => {
                    addExplanation(1, 'Developer calls saveAndFlush(). The entity is immediately stored in the Persistence Context.');
                }
            })
            .to(entity, {
                className: 'entity entity-yellow',
                duration: 0.3,
                onStart: () => {
                    addExplanation(2, 'Hibernate marks the entity as dirty and immediately flushes to database.');
                }
            })
            .to(entity, {
                x: 200,
                duration: 0.7,
                ease: "power2.in",
                onComplete: () => {
                    entity.remove();
                    dbContent.innerHTML = `
                        <div class="text-center">
                            <i data-feather="database" class="w-12 h-12 mx-auto mb-2 text-purple-500"></i>
                            <p class="text-purple-600 font-medium">Data updated immediately!</p>
                            <div class="sql-query mt-2">UPDATE voucher_template SET claimed_count=10 WHERE id=1;</div>
                        </div>
                    `;
                    feather.replace();
                    
                    const tooltip = showTooltip('saveAndFlush() forces immediate synchronization with DB', dbContent, 'top');
                    setTimeout(() => {
                        tooltip.remove();
                        saveFlushBtn.disabled = false;
                    }, 3000);
                }
            });
    }
});