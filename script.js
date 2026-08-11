document.addEventListener('DOMContentLoaded', () => {
    const blackOverlay = document.getElementById('blackOverlay');
    const bootBackground = document.getElementById('bootBackground');
    const logoGroup = document.getElementById('logoGroup');
    const loaderContainer = document.getElementById('loaderContainer');
    const setupBackground = document.getElementById('setupBackground');
    const setupLoaderContainer = document.getElementById('setupLoaderContainer');
    const setupWindow = document.getElementById('setupWindow');

    const frameToMs = (frames) => (frames / 60) * 1000;

    setTimeout(() => {
        logoGroup.classList.add('content-rise-fade');
        loaderContainer.classList.add('content-rise-fade');

        blackOverlay.style.animation = `overlayFadeInThenOut 0.9s ease-in-out forwards`;
        blackOverlay.style.animationDelay = `0s`;
        blackOverlay.style.visibility = 'visible';
        blackOverlay.style.opacity = '0';

        setTimeout(() => {
            bootBackground.style.opacity = '0';
            bootBackground.style.visibility = 'hidden';
            bootBackground.style.zIndex = '-1';
        }, 100);

    }, frameToMs(3 * 60 + 26));

    setTimeout(() => {
        setupBackground.classList.add('zoom-out');
    }, frameToMs(4 * 60));

    setTimeout(() => {
        setupLoaderContainer.classList.add('fade-in-up');
    }, frameToMs(4 * 60 + 32));
    
    setTimeout(() => {
        setupLoaderContainer.classList.remove('fade-in-up');
        setupLoaderContainer.classList.add('fade-out-down');
    }, frameToMs(6 * 60 + 40));

    setTimeout(() => {
        setupWindow.classList.add('show');
    }, frameToMs(7 * 60 + 2));

    const btnNext = document.querySelector('.btn-next');
    btnNext.addEventListener('click', () => {
        setupWindow.classList.remove('show');
        setupWindow.classList.add('hide');
        
        setTimeout(() => {
            const setupWindow2 = document.getElementById('setupWindow2');
            if (setupWindow2) {
                setupWindow2.classList.add('show');
            }
        }, frameToMs(23)); 
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const step1 = document.getElementById('step1Content');
    const step2 = document.getElementById('step2Content');
    const step3 = document.getElementById('step3Content');
    const step4 = document.getElementById('step4Content');
    const step5 = document.getElementById('step5Content');
    const step6 = document.getElementById('step6Content');
    const step7 = document.getElementById('step7Content');
    
    const backBtn = document.getElementById('backBtn');
    const titleWrapper = document.getElementById('titleWrapper');
    
    const btnNextStep2 = document.getElementById('btnNextStep2');
    const btnNextStep3 = document.getElementById('btnNextStep3');
    const btnNextStep4 = document.getElementById('btnNextStep4');
    const btnSkipStep3 = document.getElementById('btnSkipStep3');
    const btnAccept = document.getElementById('btnAccept');
    const productKeyInput = document.querySelector('.custom-input');
    const btnNextStep5 = document.getElementById('btnNextStep5');
    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    
    const cards = document.querySelectorAll('.edition-card');
    const diskCards = document.querySelectorAll('.disk-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    diskCards.forEach(card => {
        card.addEventListener('click', () => {
            diskCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            if (btnNextStep5) {
                btnNextStep5.disabled = false;
            }
        });
    });

    function transitionSteps(outStep, inStep, isForward) {
        outStep.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
        inStep.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');

        outStep.classList.add(isForward ? 'slide-out-left' : 'slide-out-right');
        inStep.classList.add(isForward ? 'slide-in-right' : 'slide-in-left');
    }

    if (btnNextStep2) {
        btnNextStep2.addEventListener('click', () => {
            transitionSteps(step1, step2, true);
            
            backBtn.style.display = 'block';
            backBtn.classList.remove('back-btn-disappear');
            backBtn.classList.add('back-btn-appear');
            
            titleWrapper.classList.remove('title-move-left');
            titleWrapper.classList.add('title-move-right');
            
            currentStep = 2;
        });
    }

    if (btnNextStep3) {
        btnNextStep3.addEventListener('click', () => {
            if (!document.querySelector('.edition-card.selected')) return; // Requires an edition to be selected
            
            transitionSteps(step2, step3, true);
            currentStep = 3;
        });
    }

    if (btnNextStep4) {
        btnNextStep4.addEventListener('click', () => {
            if (productKeyInput.value.length === 29) { // Requires full 25 chars + 4 dashes
                transitionSteps(step3, step4, true);
                currentStep = 4;
            }
        });
    }

    if (btnSkipStep3) {
        btnSkipStep3.addEventListener('click', () => {
            transitionSteps(step3, step4, true);
            currentStep = 4;
        });
    }

    if (btnAccept) {
        btnAccept.addEventListener('click', () => {
            transitionSteps(step4, step5, true);
            currentStep = 5;
        });
    }

    const btnDecline = document.getElementById('btnDecline');
    if (btnDecline) {
        btnDecline.addEventListener('click', () => {
            transitionSteps(step4, step3, false);
            currentStep = 3;
        });
    }

    if (btnNextStep5) {
        btnNextStep5.addEventListener('click', () => {
            transitionSteps(step5, step6, true);
            currentStep = 6;
        });
    }

    if (btnNo) {
        btnNo.addEventListener('click', () => {
            transitionSteps(step6, step5, false);
            currentStep = 5;
        });
    }

    if (btnYes) {
        btnYes.addEventListener('click', () => {
            transitionSteps(step6, step7, true);
            
            backBtn.classList.remove('back-btn-appear');
            backBtn.classList.add('back-btn-disappear');
            
            titleWrapper.classList.remove('title-move-right');
            titleWrapper.classList.add('title-move-left');
            
            setTimeout(() => {
                backBtn.style.display = 'none';
            }, 300);

            currentStep = 7;
            
            setTimeout(() => {
                const text1 = document.getElementById('installText1');
                const text2 = document.getElementById('installText2');
                const text3 = document.getElementById('installText3');
                const bottomText1 = document.getElementById('bottomText1');
                const progBar = document.getElementById('installProgressBar');
                const redBar = document.getElementById('redProgressBar');
                const restartBtn = document.getElementById('btnRestartNow');
                
                text1.classList.add('fade-down-out');
                
                setTimeout(() => {
                    text2.classList.add('fade-up-in');
                    bottomText1.classList.add('fade-up-in');
                    
                    progBar.classList.add('fill-purple');
                    
                    setTimeout(() => {
                        progBar.classList.replace('fill-purple', 'deplete-purple');
                        
                        setTimeout(() => {
                            text2.classList.replace('fade-up-in', 'fade-down-out');
                            bottomText1.classList.replace('fade-up-in', 'fade-down-out');
                            
                            setTimeout(() => {
                                text3.classList.add('fade-up-in');
                                restartBtn.classList.add('fade-up-in');
                                restartBtn.style.pointerEvents = 'auto';
                                
                                progBar.style.display = 'none';
                                redBar.style.opacity = '1';
                                redBar.classList.add('fill-red');
                                
                                let restartTriggered = false;
                                
                                const doRestart = () => {
                                    if (restartTriggered) return;
                                    restartTriggered = true;
                                    
                                    const setupWindow2 = document.getElementById('setupWindow2');
                                    setupWindow2.classList.remove('show');
                                    setupWindow2.classList.add('hide');
                                    
                                    setTimeout(() => {
                                        const restartOverlay = document.getElementById('restartOverlay');
                                        restartOverlay.classList.add('active');
                                        
                                        setTimeout(() => {
                                            document.getElementById('setupWindow').style.display = 'none';
                                            setupWindow2.style.display = 'none';
                                            document.getElementById('setupBackground').style.display = 'none';
                                            
                                            const bootBg = document.getElementById('bootBackground');
                                            const logoGrp = document.getElementById('logoGroup');
                                            const loader = document.getElementById('loaderContainer');
                                            const blackOverlay = document.getElementById('blackOverlay');
                                            
                                            bootBg.style.opacity = '1';
                                            bootBg.style.visibility = 'visible';
                                            bootBg.style.zIndex = '0';
                                            
                                            logoGrp.classList.remove('content-rise-fade');
                                            loader.classList.remove('content-rise-fade');
                                            
                                            const resetAnim = (el) => {
                                                el.style.animation = 'none';
                                                void el.offsetWidth;
                                                el.style.animation = null;
                                            };
                                            
                                            resetAnim(bootBg);
                                            resetAnim(logoGrp);
                                            resetAnim(loader);
                                            
                                            blackOverlay.style.transition = 'none';
                                            blackOverlay.style.animation = 'none';
                                            blackOverlay.style.opacity = '1';
                                            blackOverlay.style.visibility = 'visible';
                                            
                                            restartOverlay.style.display = 'none';
                                            
                                            setTimeout(() => {
                                                blackOverlay.style.animation = 'overlayFadeOut 0.8s ease-out 0.217s forwards';
                                                
                                                setTimeout(() => {
                                                    const darknessOverlay = document.getElementById('darknessOverlay');
                                                    const oobeContainer = document.getElementById('oobeContainer');
                                                    const oobeText = document.getElementById('oobeText');
                                                    
                                                    darknessOverlay.classList.add('active');
                                                    
                                                    setTimeout(() => {
                                                        oobeContainer.style.display = 'flex';
                                                        oobeText.classList.add('active');
                                                    }, 2000);
                                                    
                                                }, 3500);
                                                
                                            }, 50);
                                            
                                        }, 2000);
                                    }, 300);
                                };
                                
                                restartBtn.addEventListener('click', doRestart);
                                setTimeout(doRestart, 10000);
                                
                            }, 500);
                        }, 800);
                    }, 4000);
                }, 500);
            }, 1000);
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (currentStep === 6) {
                transitionSteps(step6, step5, false);
                currentStep = 5;
            } else if (currentStep === 5) {
                transitionSteps(step5, step4, false);
                currentStep = 4;
            } else if (currentStep === 4) {
                transitionSteps(step4, step3, false);
                currentStep = 3;
            } else if (currentStep === 3) {
                transitionSteps(step3, step2, false);
                currentStep = 2;
            } else if (currentStep === 2) {
                transitionSteps(step2, step1, false);
                
                backBtn.classList.remove('back-btn-appear');
                backBtn.classList.add('back-btn-disappear');
                
                titleWrapper.classList.remove('title-move-right');
                titleWrapper.classList.add('title-move-left');
                
                setTimeout(() => {
                    if (currentStep === 1) backBtn.style.display = 'none';
                }, 300);
                
                currentStep = 1;
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const productKeyInput = document.querySelector('.custom-input');
    
    if (productKeyInput) {
        productKeyInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
            
            value = value.substring(0, 25);
            
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 5 === 0) {
                    formattedValue += '-';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
        });
    }
});
