document.addEventListener('DOMContentLoaded', () => {
    const blackOverlay = document.getElementById('blackOverlay');
    const bootBackground = document.getElementById('bootBackground');
    const logoGroup = document.getElementById('logoGroup');
    const loaderContainer = document.getElementById('loaderContainer');
    const setupBackground = document.getElementById('setupBackground');
    const setupLoaderContainer = document.getElementById('setupLoaderContainer');
    const setupWindow = document.getElementById('setupWindow');

    const frameToMs = (frames) => (frames / 60) * 1000;

    const isSetupComplete = localStorage.getItem('arOS_setupComplete');
    if (isSetupComplete === 'true') {
        setupLoaderContainer.style.display = 'none';
        setupWindow.style.display = 'none';
        
        setupBackground.style.backgroundImage = "url('Assets/BG.png')";
        setupBackground.style.opacity = '0';
        setupBackground.style.visibility = 'hidden';
        setupBackground.style.transform = 'scale(1)';
        setupBackground.style.zIndex = '-1';
        setupBackground.style.animation = 'none';
        
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
                
                setupBackground.style.opacity = '1';
                setupBackground.style.visibility = 'visible';
                setupBackground.style.zIndex = '0';
                
                document.getElementById('contentContainer').style.display = 'none';
                
                const desktopContainer = document.getElementById('desktopContainer');
                if (desktopContainer) {
                    desktopContainer.style.display = 'block';
                    setTimeout(() => {
                        desktopContainer.style.opacity = '1';
                        desktopContainer.classList.add('active');
                        document.body.classList.remove('hide-cursor');
                        document.body.classList.add('second-boot');
                    }, 50);
                }
            }, 300);

        }, frameToMs(3 * 60 + 26));

        return;
    }

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
        document.body.classList.remove('hide-cursor');
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
            if (btnNextStep3) {
                btnNextStep3.disabled = false;
            }
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

    const updateSidebarHighlight = (index) => {
        const highlight = document.getElementById('sidebarHighlight');
        const listItems = document.querySelectorAll('.oobe-sidebar li');
        if (highlight && listItems[index]) {
            const itemOffset = listItems[index].offsetTop;
            highlight.style.transform = `translateY(${itemOffset}px)`;
            
            listItems.forEach(li => li.classList.remove('active'));
            listItems[index].classList.add('active');
        }
    };

    const btnOobeNext1 = document.getElementById('btnOobeNext1');
    const btnOobeNext2 = document.getElementById('btnOobeNext2');
    const btnOobeBack2 = document.getElementById('btnOobeBack2');
    const btnOobeNext3 = document.getElementById('btnOobeNext3');
    const btnOobeBack3 = document.getElementById('btnOobeBack3');
    const btnOobeNext4 = document.getElementById('btnOobeNext4');
    const btnOobeBack4 = document.getElementById('btnOobeBack4');
    const btnOobeNext5 = document.getElementById('btnOobeNext5');
    const btnOobeBack5 = document.getElementById('btnOobeBack5');
    const btnOobeNext6 = document.getElementById('btnOobeNext6');
    const btnOobeBack6 = document.getElementById('btnOobeBack6');
    const btnOobeNext7 = document.getElementById('btnOobeNext7');
    const btnOobeBack7 = document.getElementById('btnOobeBack7');
    const btnOobeSkip7 = document.getElementById('btnOobeSkip7');
    const btnOobeNext8 = document.getElementById('btnOobeNext8');
    const btnOobeBack8 = document.getElementById('btnOobeBack8');
    const btnOobeNext9 = document.getElementById('btnOobeNext9');
    const btnOobeBack9 = document.getElementById('btnOobeBack9');
    
    const oobeStep1 = document.getElementById('oobeStep1Content');
    const oobeStep2 = document.getElementById('oobeStep2Content');
    const oobeStep3 = document.getElementById('oobeStep3Content');
    const oobeStep4 = document.getElementById('oobeStep4Content');
    const oobeStep5 = document.getElementById('oobeStep5Content');
    const oobeStep6 = document.getElementById('oobeStep6Content');
    const oobeStep7 = document.getElementById('oobeStep7Content');
    const oobeStep8 = document.getElementById('oobeStep8Content');
    const oobeStep9 = document.getElementById('oobeStep9Content');
    const oobeStep10 = document.getElementById('oobeStep10Content');
    const oobeStep11 = document.getElementById('oobeStep11Content');
    const oobeStep12 = document.getElementById('oobeStep12Content');

    if (btnOobeNext1) {
        btnOobeNext1.addEventListener('click', () => {
            transitionSteps(oobeStep1, oobeStep2, true);
            updateSidebarHighlight(1);
        });
    }

    if (btnOobeBack2) {
        btnOobeBack2.addEventListener('click', () => {
            transitionSteps(oobeStep2, oobeStep1, false);
            updateSidebarHighlight(0);
        });
    }

    if (btnOobeNext2) {
        btnOobeNext2.addEventListener('click', () => {
            transitionSteps(oobeStep2, oobeStep3, true);
            updateSidebarHighlight(2);
        });
    }

    if (btnOobeBack3) {
        btnOobeBack3.addEventListener('click', () => {
            transitionSteps(oobeStep3, oobeStep2, false);
            updateSidebarHighlight(1);
        });
    }

    if (btnOobeNext3) {
        btnOobeNext3.addEventListener('click', () => {
            transitionSteps(oobeStep3, oobeStep4, true);
            updateSidebarHighlight(3);
        });
    }

    if (btnOobeBack4) {
        btnOobeBack4.addEventListener('click', () => {
            transitionSteps(oobeStep4, oobeStep3, false);
            updateSidebarHighlight(2);
        });
    }

    if (btnOobeNext4) {
        btnOobeNext4.addEventListener('click', () => {
            transitionSteps(oobeStep4, oobeStep5, true);
            updateSidebarHighlight(4);
        });
    }

    if (btnOobeBack5) {
        btnOobeBack5.addEventListener('click', () => {
            transitionSteps(oobeStep5, oobeStep4, false);
            updateSidebarHighlight(3);
        });
    }

    if (btnOobeNext5) {
        btnOobeNext5.addEventListener('click', () => {
            transitionSteps(oobeStep5, oobeStep6, true);
            updateSidebarHighlight(5);
        });
    }

    if (btnOobeBack6) {
        btnOobeBack6.addEventListener('click', () => {
            transitionSteps(oobeStep6, oobeStep5, false);
            updateSidebarHighlight(4);
        });
    }

    const avatarItems = document.querySelectorAll('.avatar-item:not(.avatar-add)');
    avatarItems.forEach(item => {
        item.addEventListener('click', () => {
            avatarItems.forEach(a => a.classList.remove('selected'));
            item.classList.add('selected');
        });
    });

    const setupBg = document.getElementById('setupBackground');
    const wallpaperMapping = {
        'BG.png': 'SetupBG.png',
        'BG1.png': 'BG1Blur.png',
        'BG2.png': 'BG2Blur.png',
        'BG3.png': 'BG3Blur.png'
    };

    const wallpaperItems = document.querySelectorAll('.wallpaper-item:not(.wallpaper-add)');
    wallpaperItems.forEach(item => {
        item.addEventListener('click', () => {
            wallpaperItems.forEach(w => w.classList.remove('selected'));
            item.classList.add('selected');
            
            const bgImage = item.style.backgroundImage;
            const match = bgImage.match(/Assets\/(BG\d*\.png)/);
            if (match && match[1] && wallpaperMapping[match[1]]) {
                setupBg.style.backgroundImage = `url('Assets/${wallpaperMapping[match[1]]}')`;
            }
        });
    });

    if (btnOobeNext6) {
        btnOobeNext6.addEventListener('click', () => {
            transitionSteps(oobeStep6, oobeStep7, true);
            updateSidebarHighlight(6);
        });
    }

    if (btnOobeBack7) {
        btnOobeBack7.addEventListener('click', () => {
            transitionSteps(oobeStep7, oobeStep6, false);
            updateSidebarHighlight(5);
        });
    }

    if (btnOobeNext7) {
        btnOobeNext7.addEventListener('click', () => {
            transitionSteps(oobeStep7, oobeStep8, true);
            updateSidebarHighlight(7);
        });
    }

    if (btnOobeSkip7) {
        btnOobeSkip7.addEventListener('click', () => {
            transitionSteps(oobeStep7, oobeStep8, true);
            updateSidebarHighlight(7);
        });
    }

    if (btnOobeBack8) {
        btnOobeBack8.addEventListener('click', () => {
            transitionSteps(oobeStep8, oobeStep7, false);
            updateSidebarHighlight(6);
        });
    }

    const locationRadioBtn = document.getElementById('locationRadioBtn');
    if (locationRadioBtn) {
        locationRadioBtn.addEventListener('click', () => {
            const radio = locationRadioBtn.querySelector('.custom-radio');
            radio.classList.toggle('selected');
        });
    }

    const pcNameInput = document.getElementById('pcNameInput');
    if (pcNameInput && btnOobeNext6) {
        pcNameInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/[\s"\/\\\[\]:|<>+=;,?]/g, '');
            e.target.value = val;
            
            const isOnlyNumbers = /^\d+$/.test(val);
            if (val.length === 0 || isOnlyNumbers) {
                btnOobeNext6.disabled = true;
            } else {
                btnOobeNext6.disabled = false;
            }
        });
    }

    const accountNameInput = document.getElementById('accountNameInput');
    if (accountNameInput && btnOobeNext5) {
        accountNameInput.addEventListener('input', (e) => {
            btnOobeNext5.disabled = e.target.value.trim().length === 0;
        });
    }

    const abdiRpcInput = document.getElementById('abdiRpcInput');
    if (abdiRpcInput && btnOobeNext7) {
        abdiRpcInput.addEventListener('input', (e) => {
            btnOobeNext7.disabled = e.target.value.trim().length === 0;
        });
    }

    if (btnOobeNext8) {
        btnOobeNext8.addEventListener('click', () => {
            transitionSteps(oobeStep8, oobeStep9, true);
            updateSidebarHighlight(8);
        });
    }

    if (btnOobeBack9) {
        btnOobeBack9.addEventListener('click', () => {
            transitionSteps(oobeStep9, oobeStep8, false);
            updateSidebarHighlight(7);
        });
    }

    if (btnOobeNext9) {
        btnOobeNext9.addEventListener('click', () => {
            transitionSteps(oobeStep9, oobeStep10, true);
            updateSidebarHighlight(9);
        });
    }

    const btnOobeNext10 = document.getElementById('btnOobeNext10');
    const btnOobeBack10 = document.getElementById('btnOobeBack10');

    if (btnOobeBack10) {
        btnOobeBack10.addEventListener('click', () => {
            transitionSteps(oobeStep10, oobeStep9, false);
            updateSidebarHighlight(8);
        });
    }

    const lookItems = document.querySelectorAll('.look-item');
    lookItems.forEach(item => {
        item.addEventListener('click', () => {
            lookItems.forEach(l => l.classList.remove('selected'));
            item.classList.add('selected');
        });
    });

    if (btnOobeNext10) {
        btnOobeNext10.addEventListener('click', () => {
            transitionSteps(oobeStep10, oobeStep11, true);
            updateSidebarHighlight(10);
        });
    }

    const protectCards = document.querySelectorAll('.protect-card');
    const btnOobeNext11 = document.getElementById('btnOobeNext11');
    const btnOobeBack11 = document.getElementById('btnOobeBack11');
    const btnOobeNext12 = document.getElementById('btnOobeNext12');
    const btnOobeBack12 = document.getElementById('btnOobeBack12');
    const btnOobeCustomize12 = document.getElementById('btnOobeCustomize12');
    const oobeStep13 = document.getElementById('oobeStep13Content');
    const oobeSidebar = document.querySelector('.oobe-sidebar');
    const oobeContent = document.querySelector('.oobe-content');
    const btnOobeNo13 = document.getElementById('btnOobeNo13');
    const btnOobeYes13 = document.getElementById('btnOobeYes13');
    
    if (btnOobeBack11) {
        btnOobeBack11.addEventListener('click', () => {
            transitionSteps(oobeStep11, oobeStep10, false);
            updateSidebarHighlight(9);
        });
    }

    if (btnOobeNext11) {
        protectCards.forEach(card => {
            card.addEventListener('click', () => {
                protectCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                btnOobeNext11.disabled = false;
            });
        });
        
        btnOobeNext11.addEventListener('click', () => {
            transitionSteps(oobeStep11, oobeStep12, true);
            updateSidebarHighlight(11);
        });
    }

    if (btnOobeBack12) {
        btnOobeBack12.addEventListener('click', () => {
            transitionSteps(oobeStep12, oobeStep11, false);
            updateSidebarHighlight(10);
        });
    }

    const triggerStep13 = () => {
        oobeContent.classList.remove('slide-in-left', 'slide-in-right');
        oobeContent.classList.add('slide-out-left-content');
        
        setTimeout(() => {
            oobeContent.style.display = 'none';
            oobeSidebar.classList.add('fade-out-down-sidebar');
            
            setTimeout(() => {
                oobeSidebar.style.display = 'none';
                oobeStep13.style.display = 'flex';
                oobeStep13.classList.add('fade-in-up-center');
            }, 400);
        }, 500);
    };

    if (btnOobeNext12) {
        btnOobeNext12.addEventListener('click', triggerStep13);
    }
    
    if (btnOobeCustomize12) {
        btnOobeCustomize12.addEventListener('click', triggerStep13);
    }

    if (btnOobeYes13) {
        btnOobeYes13.addEventListener('click', () => {
            oobeStep13.classList.remove('fade-in-up-center-fast');
            oobeStep13.classList.add('fade-out-down-content-fast');
            
            setTimeout(() => {
                const oobeAppWindow = document.getElementById('oobeAppWindow');
                if (oobeAppWindow) {
                    oobeAppWindow.classList.add('fade-out-down-window-fast');
                }
                
                setTimeout(() => {
                    if (oobeAppWindow) oobeAppWindow.style.display = 'none';
                    
                    const finalAppWindow = document.getElementById('finalAppWindow');
                    if (finalAppWindow) {
                        finalAppWindow.classList.add('show-final-window');
                        setTimeout(() => {
                            const finalAppContent = document.getElementById('finalAppContent');
                            if (finalAppContent) {
                                finalAppContent.classList.add('show-content-fast');
                            }
                        }, 150);
                    }
                }, 483);
            }, 283);
        });
    }

    const btnLetsStart = document.getElementById('btnLetsStart');
    if (btnLetsStart) {
        btnLetsStart.addEventListener('click', () => {
            const finalAppWindow = document.getElementById('finalAppWindow');
            if (finalAppWindow) {
                finalAppWindow.classList.add('fade-out-down-window-fast');
            }
            
            setTimeout(() => {
                if (finalAppWindow) finalAppWindow.style.display = 'none';
                
                const finalLoadingContainer = document.getElementById('finalLoadingContainer');
                const finalSpinnerGroup = document.getElementById('finalSpinnerGroup');
                const finalText1 = document.getElementById('finalText1');
                const finalText2 = document.getElementById('finalText2');
                const finalText3 = document.getElementById('finalText3');
                const finalText4 = document.getElementById('finalText4');
                const finalDoNotTurnOff = document.getElementById('finalDoNotTurnOff');
                
                finalLoadingContainer.style.display = 'flex';
                finalSpinnerGroup.classList.add('fade-up-in-standard');
                finalDoNotTurnOff.classList.add('fade-up-in-standard');
                
                setTimeout(() => {
                    finalText1.classList.add('fade-up-out-standard');
                    setTimeout(() => {
                        finalText2.style.opacity = '1';
                        finalText2.classList.add('fade-up-in-standard');
                    }, 200);
                    
                    setTimeout(() => {
                        finalText2.classList.replace('fade-up-in-standard', 'fade-up-out-standard');
                        setTimeout(() => {
                            finalText3.style.opacity = '1';
                            finalText3.classList.add('fade-up-in-standard');
                        }, 200);
                        
                        setTimeout(() => {
                            finalSpinnerGroup.classList.replace('fade-up-in-standard', 'fade-up-out-standard');
                            finalDoNotTurnOff.classList.replace('fade-up-in-standard', 'fade-up-out-standard');
                            
                            setTimeout(() => {
                                finalText4.style.opacity = '1';
                                finalText4.classList.add('fade-up-in-standard');
                                
                                setTimeout(() => {
                                    finalText4.classList.replace('fade-up-in-standard', 'fade-up-out-standard');
                                    setTimeout(() => {
                                        document.getElementById('setupBackground').style.backgroundImage = "url('Assets/BG.png')";
                                        const desktopContainer = document.getElementById('desktopContainer');
                                        if (desktopContainer) {
                                            desktopContainer.style.display = 'block';
                                            setTimeout(() => {
                                                desktopContainer.style.opacity = '1';
                                                desktopContainer.classList.add('active');
                                                localStorage.setItem('arOS_setupComplete', 'true');
                                            }, 50);
                                        }
                                    }, 500);
                                }, 3000);
                                
                            }, 150);
                            
                        }, 3000);
                    }, 3000);
                }, 3000);
            }, 483);
        });
    }

    if (btnOobeNo13) {
        btnOobeNo13.addEventListener('click', () => {
            oobeStep13.classList.remove('fade-in-up-center');
            oobeStep13.classList.add('fade-out-down-sidebar'); 
            
            setTimeout(() => {
                oobeStep13.style.display = 'none';
                oobeStep13.classList.remove('fade-out-down-sidebar');
                
                oobeSidebar.style.display = 'flex';
                oobeSidebar.classList.remove('fade-out-down-sidebar', 'fade-out-down-sidebar-fast');
                oobeSidebar.classList.add('fade-in-up-center');
                
                setTimeout(() => {
                    oobeContent.style.display = 'flex';
                    oobeContent.classList.remove('slide-out-left-content', 'slide-out-left-content-fast');
                    oobeContent.classList.add('slide-in-left');
                    
                    const steps = [
                        document.getElementById('oobeStep1Content'), document.getElementById('oobeStep2Content'), document.getElementById('oobeStep3Content'), document.getElementById('oobeStep4Content'), document.getElementById('oobeStep5Content'), document.getElementById('oobeStep6Content'), document.getElementById('oobeStep7Content'), document.getElementById('oobeStep8Content'), document.getElementById('oobeStep9Content'), document.getElementById('oobeStep10Content'), document.getElementById('oobeStep11Content'), document.getElementById('oobeStep12Content')
                    ];
                    
                    steps.forEach(s => {
                        if(s) {
                            s.style.display = 'none';
                            s.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');
                            s.style.opacity = '0';
                        }
                    });
                    
                    if (steps[0]) {
                        steps[0].style.display = 'flex';
                        steps[0].style.opacity = '1';
                    }
                    updateSidebarHighlight(0);

                    setTimeout(() => {
                        oobeSidebar.classList.remove('fade-in-up-center');
                        oobeContent.classList.remove('slide-in-left');
                    }, 500);

                }, 400);

            }, 400);
        });
    }

    const setupCustomDropdowns = () => {
        const dropdowns = document.querySelectorAll('.custom-dropdown');
        dropdowns.forEach(dropdown => {
            if (dropdown.id === 'timeZoneDropdown') return;
            
            const selected = dropdown.querySelector('.custom-dropdown-selected');
            const options = dropdown.querySelectorAll('.custom-dropdown-option');
            if (!selected) return;
            
            selected.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('open'); });
                const tzDropdown = document.getElementById('timeZoneDropdown');
                if (tzDropdown) tzDropdown.classList.remove('open');
                dropdown.classList.toggle('open');
            });
            
            options.forEach(opt => {
                opt.addEventListener('click', (e) => {
                    e.stopPropagation();
                    options.forEach(o => o.classList.remove('selected'));
                    opt.classList.add('selected');
                    selected.textContent = opt.textContent;
                    dropdown.classList.remove('open');
                });
            });
        });
        
        document.addEventListener('click', (e) => {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('open');
                }
            });
        });
    };
    setupCustomDropdowns();

    const autoTimeRadioBtn = document.getElementById('autoTimeRadioBtn');
    if (autoTimeRadioBtn) {
        autoTimeRadioBtn.addEventListener('click', () => {
            const radio = autoTimeRadioBtn.querySelector('.custom-radio');
            const isSelected = radio.classList.toggle('selected');
            const timeZoneMap = document.getElementById('timeZoneMap');
            const timeZoneDropdown = document.getElementById('timeZoneDropdown');
            
            if (isSelected) {
                if (timeZoneMap) { timeZoneMap.style.pointerEvents = 'none'; timeZoneMap.style.opacity = '0.5'; }
                if (timeZoneDropdown) { timeZoneDropdown.style.pointerEvents = 'none'; timeZoneDropdown.style.opacity = '0.5'; }
            } else {
                if (timeZoneMap) { timeZoneMap.style.pointerEvents = 'auto'; timeZoneMap.style.opacity = '1'; }
                if (timeZoneDropdown) { timeZoneDropdown.style.pointerEvents = 'auto'; timeZoneDropdown.style.opacity = '1'; }
            }
        });
    }

    const timeZoneDropdown = document.getElementById('timeZoneDropdown');
    const timeZoneSelected = document.getElementById('timeZoneSelected');
    const timeZoneOptions = document.getElementById('timeZoneOptions');
    const mapDot = document.getElementById('mapDot');
    const timeZoneMap = document.getElementById('timeZoneMap');
    
    let currentTimeZoneId = 'utc+8';

    const timeZones = [
        { id: 'utc-12', name: '(GMT -12:00) Eniwetok, Kwajalein', x: 90, y: 57 },
        { id: 'utc-11', name: '(GMT -11:00) Midway Island, Samoa', x: 2, y: 46 },
        { id: 'utc-10', name: '(GMT -10:00) Hawaii', x: 5, y: 48 },
        { id: 'utc-9', name: '(GMT -9:00) Alaska', x: 6, y: 21 },
        { id: 'utc-8', name: '(GMT -8:00) Pacific Time (US & Canada)', x: 7, y: 21 },
        { id: 'utc-7', name: '(GMT -7:00) Mountain Time (US & Canada)', x: 14, y: 36 },
        { id: 'utc-6', name: '(GMT -6:00) Central Time (US & Canada), Mexico City', x: 20, y: 51 },
        { id: 'utc-5', name: '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima', x: 27, y: 66 },
        { id: 'utc-4.5', name: '(GMT -4:30) Caracas', x: 31, y: 52 },
        { id: 'utc-4', name: '(GMT -4:00) Atlantic Time (Canada), La Paz, Santiago', x: 33, y: 65 },
        { id: 'utc-3.5', name: '(GMT -3:30) Newfoundland', x: 35, y: 32 },
        { id: 'utc-3', name: '(GMT -3:00) Brazil, Buenos Aires, Georgetown', x: 38, y: 72 },
        { id: 'utc-2', name: '(GMT -2:00) Mid-Atlantic', x: 42, y: 50 },
        { id: 'utc-1', name: '(GMT -1:00) Azores, Cape Verde Islands', x: 44, y: 40 },
        { id: 'utc+0', name: '(GMT +0:00) Western Europe Time, London, Lisbon, Casablanca', x: 48, y: 30 },
        { id: 'utc+1', name: '(GMT +1:00) Central European Time, Brussels, Madrid, Paris', x: 51, y: 32 },
        { id: 'utc+2', name: '(GMT +2:00) Eastern European Time, Athens, Cairo, Pretoria', x: 55, y: 40 },
        { id: 'utc+3', name: '(GMT +3:00) Baghdad, Kuwait, Riyadh, Moscow', x: 60, y: 25 },
        { id: 'utc+3.5', name: '(GMT +3:30) Tehran', x: 63, y: 38 },
        { id: 'utc+4', name: '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi', x: 65, y: 42 },
        { id: 'utc+4.5', name: '(GMT +4:30) Kabul', x: 67, y: 39 },
        { id: 'utc+5', name: '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent', x: 69, y: 28 },
        { id: 'utc+5.5', name: '(GMT +5:30) Mumbai, Kolkata, Chennai, New Delhi', x: 67, y: 50 },
        { id: 'utc+5.75', name: '(GMT +5:45) Kathmandu', x: 72, y: 43 },
        { id: 'utc+6', name: '(GMT +6:00) Almaty, Dhaka, Colombo', x: 74, y: 45 },
        { id: 'utc+6.5', name: '(GMT +6:30) Yangon, Cocos Islands', x: 76, y: 49 },
        { id: 'utc+7', name: '(GMT +7:00) Bangkok, Hanoi, Jakarta', x: 78, y: 58 },
        { id: 'utc+8', name: '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong', x: 81, y: 38 },
        { id: 'utc+9', name: '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk', x: 87, y: 36 },
        { id: 'utc+9.5', name: '(GMT +9:30) Adelaide, Darwin', x: 86, y: 72 },
        { id: 'utc+10', name: '(GMT +10:00) Eastern Australia, Guam, Vladivostok', x: 89, y: 78 },
        { id: 'utc+11', name: '(GMT +11:00) Magadan, Solomon Islands, New Caledonia', x: 92, y: 70 },
        { id: 'utc+12', name: '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka', x: 95, y: 82 },
        { id: 'utc+13', name: '(GMT +13:00) Nuku\'alofa', x: 97, y: 75 }
    ];

    if (timeZoneDropdown && mapDot && timeZoneMap) {
        const renderDropdown = () => {
            timeZoneOptions.innerHTML = '';
            timeZones.forEach(tz => {
                const opt = document.createElement('div');
                opt.className = `custom-dropdown-option ${tz.id === currentTimeZoneId ? 'selected' : ''}`;
                opt.textContent = tz.name;
                opt.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentTimeZoneId = tz.id;
                    updateDotPosition();
                    timeZoneDropdown.classList.remove('open');
                    renderDropdown();
                });
                timeZoneOptions.appendChild(opt);
            });
        };

        const updateDotPosition = () => {
            const selectedTz = timeZones.find(tz => tz.id === currentTimeZoneId) || timeZones[0];
            timeZoneSelected.textContent = selectedTz.name;
            mapDot.style.left = selectedTz.x + '%';
            mapDot.style.top = selectedTz.y + '%';
        };

        timeZoneDropdown.addEventListener('click', () => {
            timeZoneDropdown.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!timeZoneDropdown.contains(e.target)) {
                timeZoneDropdown.classList.remove('open');
            }
        });

        renderDropdown();
        updateDotPosition();

        timeZoneMap.addEventListener('click', (e) => {
            const rect = timeZoneMap.getBoundingClientRect();
            const clickX = ((e.clientX - rect.left) / rect.width) * 100;
            const clickY = ((e.clientY - rect.top) / rect.height) * 100;

            let closestTz = timeZones[0];
            let minDistance = Infinity;

            timeZones.forEach(tz => {
                const distance = Math.sqrt(Math.pow(clickX - tz.x, 2) + Math.pow(clickY - tz.y, 2));
                if (distance < minDistance) {
                    minDistance = distance;
                    closestTz = tz;
                }
            });

            currentTimeZoneId = closestTz.id;
            updateDotPosition();
            renderDropdown();
        });
    }

    const countryItems = document.querySelectorAll('.country-item');
    countryItems.forEach(item => {
        item.addEventListener('click', () => {
            countryItems.forEach(c => c.classList.remove('selected'));
            item.classList.add('selected');
        });
    });

    setTimeout(() => updateSidebarHighlight(0), 100);

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
                                        document.body.classList.add('hide-cursor');
                                        
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

                                            document.body.classList.add('second-boot');

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
                                                        
                                                        const setupBg = document.getElementById('setupBackground');
                                                        setupBg.style.display = 'block';
                                                        setupBg.style.opacity = '1';
                                                        setupBg.style.zIndex = '40';
                                                        
                                                        setTimeout(() => {
                                                            oobeContainer.classList.add('fade-out');
                                                            darknessOverlay.classList.add('fade-out');
                                                            setTimeout(() => {
                                                                document.body.classList.remove('hide-cursor');
                                                                oobeContainer.style.display = 'none';
                                                                darknessOverlay.style.display = 'none';
                                                                const oobeAppWindow = document.getElementById('oobeAppWindow');
                                                                if (oobeAppWindow) {
                                                                    oobeAppWindow.classList.add('show');
                                                                }
                                                            }, 1000);
                                                        }, 3500);
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
