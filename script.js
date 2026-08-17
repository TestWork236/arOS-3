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
        
        const savedWP = localStorage.getItem('arOS_wallpaper') || 'BG.png';
        setupBackground.style.backgroundImage = `url('Assets/${savedWP}')`;
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
            if (match && match[1]) {
                localStorage.setItem('arOS_wallpaper', match[1]);
                if (wallpaperMapping[match[1]]) {
                    setupBg.style.backgroundImage = `url('Assets/${wallpaperMapping[match[1]]}')`;
                } else {
                    setupBg.style.backgroundImage = `url('Assets/${match[1]}')`;
                }
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
                                        const savedWP = localStorage.getItem('arOS_wallpaper') || 'BG.png';
                                        document.getElementById('setupBackground').style.backgroundImage = `url('Assets/${savedWP}')`;
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

document.addEventListener('DOMContentLoaded', () => {
    const btnLetsStart = document.getElementById('btnLetsStart');
    if (btnLetsStart) {
        btnLetsStart.addEventListener('click', () => {
            window.arOSConfig = window.arOSConfig || { firstName: "Abdi", timezoneOffset: null };
            
            const accInput = document.getElementById('accountNameInput');
            if (accInput && accInput.value.trim() !== '') {
                window.arOSConfig.firstName = accInput.value.trim().split(' ')[0];
            }
            
            const autoTimeRadio = document.querySelector('#autoTimeRadioBtn .custom-radio');
            if (autoTimeRadio && autoTimeRadio.classList.contains('selected')) {
                const selectedCountry = document.querySelector('.country-item.selected');
                if (selectedCountry) {
                    const cName = selectedCountry.textContent;
                    const offsets = { "United States of America": -5, "United Kingdom": 0, "India": 5.5, "China": 8, "Japan": 9, "Australia": 10, "Germany": 1, "France": 1, "Brazil": -3, "Canada": -5, "Mexico": -6, "Russia": 3, "South Korea": 9, "Indonesia": 7, "Saudi Arabia": 3, "Turkey": 3, "South Africa": 2 };
                    window.arOSConfig.timezoneOffset = offsets[cName] !== undefined ? offsets[cName] : null;
                }
            } else {
                const tzText = document.getElementById('timeZoneSelected');
                if (tzText) {
                    const match = tzText.textContent.match(/GMT ([+-][0-9]+):([0-9]+)/);
                    if (match) {
                        const h = parseInt(match[1]);
                        const m = parseInt(match[2]);
                        window.arOSConfig.timezoneOffset = h + (h < 0 ? -1 : 1) * (m / 60);
                    }
                }
            }
            
            localStorage.setItem('arOS_firstName', window.arOSConfig.firstName);
            if (window.arOSConfig.timezoneOffset !== null) {
                localStorage.setItem('arOS_tzOffset', window.arOSConfig.timezoneOffset);
            }

            updateTopBarClock();
            if (!window.clockInterval) {
                window.clockInterval = setInterval(updateTopBarClock, 1000);
            }
        });
    }

    if (localStorage.getItem('arOS_setupComplete') === 'true') {
        const storedName = localStorage.getItem('arOS_firstName');
        const storedTz = localStorage.getItem('arOS_tzOffset');
        window.arOSConfig = { 
            firstName: storedName || "Abdi", 
            timezoneOffset: storedTz !== null ? parseFloat(storedTz) : null 
        };
        updateTopBarClock();
        if (!window.clockInterval) {
            window.clockInterval = setInterval(updateTopBarClock, 1000);
        }
    }
    
    const startBtn = document.getElementById('startBtn');
    const launchpadContainer = document.getElementById('launchpadContainer');
    if (startBtn && launchpadContainer) {
        startBtn.addEventListener('click', () => {
            launchpadContainer.classList.toggle('active');
        });
        
        launchpadContainer.addEventListener('click', (e) => {
            if (e.target === launchpadContainer || e.target.classList.contains('launchpad-blur-bg')) {
                launchpadContainer.classList.remove('active');
            }
        });
    }
});

function updateTopBarClock() {
    const topBarDate = document.getElementById('topBarDate');
    const launchpadGreeting = document.getElementById('launchpadGreeting');
    if (!topBarDate) return;

    let date = new Date();
    
    if (window.arOSConfig && window.arOSConfig.timezoneOffset !== null) {
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        date = new Date(utc + (3600000 * window.arOSConfig.timezoneOffset));
    }

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const hours = date.getHours();
    const mins = date.getMinutes();
    
    const pad = n => n < 10 ? '0'+n : n;
    
    topBarDate.textContent = `${day} ${dateNum}  ${pad(hours)}:${pad(mins)}`;

    if (launchpadGreeting) {
        let greeting = "Good Night";
        if (hours >= 5 && hours < 12) greeting = "Good Morning";
        else if (hours >= 12 && hours < 17) greeting = "Good Afternoon";
        else if (hours >= 17 && hours < 21) greeting = "Good Evening";

        const storedName = localStorage.getItem('arOS_firstName');
        const name = storedName ? storedName : ((window.arOSConfig && window.arOSConfig.firstName) ? window.arOSConfig.firstName : "");
        launchpadGreeting.textContent = name ? `${greeting}, ${name}!` : `${greeting}!`;
    }
}

let openWindows = [];

function updateDockIndicator() {
    let dockIcon = document.getElementById('dockFilesApp');
    if (openWindows.length === 0) {
        if (dockIcon) {
            dockIcon.classList.remove('dock-icon-new');
            dockIcon.classList.add('dock-icon-removing');
            setTimeout(() => dockIcon.remove(), 500);
        }
        return;
    }
    
    if (!dockIcon) {
        dockIcon = document.createElement('div');
        dockIcon.className = 'dock-icon active dock-icon-new';
        dockIcon.id = 'dockFilesApp';
        dockIcon.style.background = 'transparent';
        dockIcon.style.boxShadow = 'none';
        dockIcon.innerHTML = `<img src="Assets/Files.png" draggable="false" style="width: 100%; height: 100%; object-fit: contain;">`;
        const indicator = document.createElement('div');
        indicator.className = 'dock-indicator';
        dockIcon.appendChild(indicator);
        const bottomDock = document.querySelector('.bottom-dock');
        bottomDock.insertBefore(dockIcon, bottomDock.lastElementChild);
        
        dockIcon.addEventListener('click', () => {
            openWindows.forEach(w => {
                if(w.dataset.minimized === 'true') {
                    w.style.willChange = 'transform, opacity';
                    w.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
                    w.style.opacity = '1';
                    w.style.transform = w.dataset.lastTransform || 'none';
                    if (w.dataset.wasMaximized === 'true') w.classList.add('window-maximized');
                    if (w.dataset.wasFullscreen === 'true') w.classList.add('window-fullscreen');
                    w.dataset.minimized = 'false';
                    w.style.pointerEvents = 'auto';
                    if (w.dataset.state === 'fullscreen') {
                        document.body.classList.add('fullscreen-ui');
                    }
                    setTimeout(() => { 
                        w.style.transition = ''; 
                        w.style.willChange = 'auto';
                    }, 300);
                }
                w.style.zIndex = getHighestZIndex() + 1;
            });
        });
    }
    
    const indicator = dockIcon.querySelector('.dock-indicator');
    indicator.innerHTML = '';
    
    const oldBadge = dockIcon.querySelector('.dock-badge');
    if (oldBadge) oldBadge.remove();

    if (openWindows.length === 2) {
        indicator.innerHTML = '<div class="dock-indicator-dot"></div><div class="dock-indicator-dot"></div>';
    } else if (openWindows.length > 2) {
        const badge = document.createElement('div');
        badge.className = 'dock-badge';
        badge.textContent = openWindows.length + '+';
        dockIcon.appendChild(badge);
    }
}

function getHighestZIndex() {
    let highest = 100;
    document.querySelectorAll('.os-window').forEach(w => {
        const z = parseInt(w.style.zIndex || 100);
        if (z > highest) highest = z;
    });
    return highest;
}

const launchpadFilesApp = document.getElementById('launchpadFilesApp');
const templateWindow = document.getElementById('filesAppWindow');
const desktopContainer = document.getElementById('desktopContainer');

if (launchpadFilesApp && templateWindow) {
    launchpadFilesApp.addEventListener('click', () => {
        document.getElementById('launchpadContainer').classList.remove('active');
        
        const newWin = templateWindow.cloneNode(true);
        newWin.id = 'window_' + Date.now();
        
        const tabId = 'tab-' + Date.now();
        const tab = newWin.querySelector('.files-tab');
        if (tab) tab.dataset.tab = tabId;
        const viewWrap = newWin.querySelector('.tab-view-wrapper');
        if (viewWrap) viewWrap.id = tabId;
        
        newWin.style.display = 'flex';
        newWin.style.zIndex = getHighestZIndex() + 1;
        newWin.style.left = (45 + Math.random() * 10) + '%';
        newWin.style.top = (45 + Math.random() * 10) + '%';
        newWin.style.transform = 'translate(-50%, -50%)';
        
        newWin.classList.add('os-window-opening');
        const winBody = newWin.querySelector('.os-window-body');
        if (winBody) {
            winBody.classList.add('os-window-content-opening');
        }

        desktopContainer.appendChild(newWin);
        openWindows.push(newWin);
        updateDockIndicator();
        updateNavButtons(newWin, tabId);
        
        setTimeout(() => {
            const sidebar = newWin.querySelector('.files-sidebar-container');
            if(sidebar) {
                const highlight = sidebar.querySelector('.files-sidebar-highlight');
                const activeItem = sidebar.querySelector('.files-sidebar-item.active');
                if (highlight && activeItem) {
                    highlight.style.transform = `translateY(${activeItem.offsetTop}px)`;
                }
            }
        }, 10);
        
        setTimeout(() => {
            newWin.classList.remove('os-window-opening');
            const winBody = newWin.querySelector('.os-window-body');
            if (winBody) winBody.classList.remove('os-window-content-opening');
        }, 400);
        
        newWin.addEventListener('mousedown', () => {
            newWin.style.zIndex = getHighestZIndex() + 1;
        });
        
        navigateTo(1, newWin, tabId, false, null, true);
    });
}

document.addEventListener('click', (e) => {
    const newTabBtn = e.target.closest('.btn-new-tab');
    if (newTabBtn) {
        const win = newTabBtn.closest('.os-window');
        const tabsContainer = win.querySelector('.files-tabs-container');
        const mainContent = win.querySelector('#filesMainContentWrapper');
        
        tabsContainer.querySelectorAll('.files-tab').forEach(t => t.classList.remove('active'));
        if(mainContent) {
            mainContent.querySelectorAll('.tab-view-wrapper').forEach(w => w.classList.remove('active'));
        }
        
        const tabId = 'tab-' + Date.now();
        const newTab = document.createElement('div');
        newTab.className = 'files-tab active';
        newTab.dataset.tab = tabId;
        newTab.dataset.folderId = "1";
        newTab.style.cssText = 'height: 32px; width: 150px; min-width: 48px; flex-shrink: 1; background: rgba(255, 255, 255, 0.25); border: 1px solid rgba(255, 255, 255, 0.6); border-top: none; border-radius: 0 0 8px 8px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; box-shadow: inset 0 2px 10px rgba(255,255,255,0.5), 0 6px 12px rgba(0,0,0,0.06); cursor: pointer; position: relative; z-index: 10; transition: width 0.2s, background 0.2s;';
        newTab.innerHTML = `
            <div class="tab-content-wrap">
                <div class="tab-inner">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#e67e22" stroke-width="2" style="width: 14px; height: 14px; flex-shrink: 0;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span style="font-size: 11px; color: #555; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Home</span>
                </div>
            </div>
            <div class="window-btn tab-close-btn" style="width: 20px; height: 20px; color: #555; flex-shrink: 0; margin-left: 4px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
        `;
        tabsContainer.appendChild(newTab);
        
        if(mainContent) {
            const newViewWrap = document.createElement('div');
            newViewWrap.className = 'tab-view-wrapper active';
            newViewWrap.id = tabId;
            mainContent.appendChild(newViewWrap);
            navigateTo(1, win, tabId, false, null, true);
        }
        
        const sidebar = win.querySelector('.files-sidebar-container');
        if(sidebar) {
            sidebar.querySelectorAll('.files-sidebar-item').forEach(i => i.classList.remove('active'));
            const homeItem = sidebar.querySelector('.files-sidebar-item[data-id="1"]');
            if(homeItem) {
                homeItem.classList.add('active');
                const highlight = sidebar.querySelector('.files-sidebar-highlight');
                if(highlight) highlight.style.transform = `translateY(${homeItem.offsetTop}px)`;
            }
        }
	updateNavButtons(win, tabId);
        return;
    }

    const closeTabBtn = e.target.closest('.tab-close-btn');
    if (closeTabBtn) {
        const tab = closeTabBtn.closest('.files-tab');
        const container = tab.closest('.files-tabs-container');
        const isActive = tab.classList.contains('active');
        const tabId = tab.dataset.tab;
        
        tab.remove();
        
        const win = container.closest('.os-window');
        const mainContent = win.querySelector('#filesMainContentWrapper');
        if (mainContent && tabId) {
            const viewWrap = mainContent.querySelector(`#${tabId}`);
            if (viewWrap) viewWrap.remove();
        }
        
        const remainingTabs = container.querySelectorAll('.files-tab');
        if (remainingTabs.length === 0) {
            openWindows = openWindows.filter(w => w !== win);
            win.remove();
            updateDockIndicator();
            if (openWindows.length === 0) {
                document.body.classList.remove('fullscreen-ui');
            }
        } else if (isActive) {
            const lastTab = remainingTabs[remainingTabs.length - 1];
            lastTab.classList.add('active');
            if (mainContent) {
                const newActiveView = mainContent.querySelector(`#${lastTab.dataset.tab}`);
                if (newActiveView) newActiveView.classList.add('active');
            }
            const folderId = lastTab.dataset.folderId || "1";
            const sidebar = win.querySelector('.files-sidebar-container');
            if(sidebar) {
                sidebar.querySelectorAll('.files-sidebar-item').forEach(i => i.classList.remove('active'));
                const targetItem = sidebar.querySelector(`.files-sidebar-item[data-id="${folderId}"]`);
                if(targetItem) {
                    targetItem.classList.add('active');
                    const highlight = sidebar.querySelector('.files-sidebar-highlight');
                    if(highlight) highlight.style.transform = `translateY(${targetItem.offsetTop}px)`;
                }
            }
        }
        return;
    }

    const tabElement = e.target.closest('.files-tab');
    if (tabElement && !e.target.closest('.tab-close-btn')) {
        const win = tabElement.closest('.os-window');
        const container = tabElement.closest('.files-tabs-container');
        const mainContent = win.querySelector('#filesMainContentWrapper');
        
        container.querySelectorAll('.files-tab').forEach(t => t.classList.remove('active'));
        tabElement.classList.add('active');
        
        if (mainContent) {
            mainContent.querySelectorAll('.tab-view-wrapper').forEach(w => w.classList.remove('active'));
            const targetView = mainContent.querySelector(`#${tabElement.dataset.tab}`);
            if (targetView) targetView.classList.add('active');
        }
        
        const folderId = tabElement.dataset.folderId || "1";
        const sidebar = win.querySelector('.files-sidebar-container');
        if(sidebar) {
            sidebar.querySelectorAll('.files-sidebar-item').forEach(i => i.classList.remove('active'));
            const targetItem = sidebar.querySelector(`.files-sidebar-item[data-id="${folderId}"]`);
            if(targetItem) {
                targetItem.classList.add('active');
                const highlight = sidebar.querySelector('.files-sidebar-highlight');
                if(highlight) highlight.style.transform = `translateY(${targetItem.offsetTop}px)`;
            }
        }
	updateNavButtons(win, tabElement.dataset.tab);
        return;
    }
    
    const minimizeBtn = e.target.closest('.btn-minimize');
    if (minimizeBtn) {
        const win = minimizeBtn.closest('.os-window');
        const dockIcon = document.getElementById('dockFilesApp');
        
        win.classList.remove('os-window-opening');
        
        if (win.dataset.state !== 'maximized' && win.dataset.state !== 'fullscreen') {
            if (win.style.transform !== 'none' && win.style.transform !== '') {
                const rect = win.getBoundingClientRect();
                win.style.transform = 'none';
                win.style.left = rect.left + 'px';
                win.style.top = rect.top + 'px';
            }
        }
        
        win.dataset.wasMaximized = win.classList.contains('window-maximized');
        win.dataset.wasFullscreen = win.classList.contains('window-fullscreen');
        win.classList.remove('window-maximized', 'window-fullscreen');
        void win.offsetWidth; 
        
        win.dataset.lastTransform = win.style.transform || 'none';
        win.style.willChange = 'transform, opacity';
        win.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
        win.dataset.minimized = 'true';
        win.style.pointerEvents = 'none';

        if (win.dataset.state === 'fullscreen') {
            document.body.classList.remove('fullscreen-ui');
        }

        if (dockIcon) {
            const dockRect = dockIcon.getBoundingClientRect();
            const winRect = win.getBoundingClientRect(); 
            const dx = (dockRect.left + dockRect.width / 2) - (winRect.left + winRect.width / 2);
            const dy = (dockRect.top + dockRect.height / 2) - (winRect.top + winRect.height / 2);
            win.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
            win.style.opacity = '0';
        } else {
            win.style.opacity = '0';
        }
        setTimeout(() => { win.style.willChange = 'auto'; }, 300);
        return;
    }
    
    const maxBtn = e.target.closest('.btn-maximize');
    if (maxBtn && !e.target.closest('.window-maximize-menu-item')) {
        const win = maxBtn.closest('.os-window');
        toggleMaximize(win, maxBtn, false);
        return;
    }
    
    const maxMenuItem = e.target.closest('.window-maximize-menu-item');
    if (maxMenuItem) {
        const win = maxMenuItem.closest('.os-window');
        const action = maxMenuItem.dataset.action;
        const maxButton = maxMenuItem.closest('.btn-maximize');
        maxButton.querySelector('.window-maximize-menu').classList.remove('show');
        if (action === 'maximize') {
            toggleMaximize(win, maxButton, false);
        } else if (action === 'fullscreen') {
            toggleMaximize(win, maxButton, true);
        }
        return;
    }
});

document.addEventListener('contextmenu', (e) => {
    const maxBtn = e.target.closest('.btn-maximize');
    if (maxBtn) {
        e.preventDefault();
        const menu = maxBtn.querySelector('.window-maximize-menu');
        document.querySelectorAll('.window-maximize-menu').forEach(m => {
            if(m !== menu) m.classList.remove('show');
        });
        menu.classList.toggle('show');
    }
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.btn-maximize')) {
        document.querySelectorAll('.window-maximize-menu').forEach(m => m.classList.remove('show'));
    }
});

document.addEventListener('dblclick', (e) => {
    const gridItem = e.target.closest('.files-grid-item');
    if (gridItem && gridItem.dataset.id) {
        const win = gridItem.closest('.os-window');
        const activeTab = win.querySelector('.files-tab.active');
        const tabId = activeTab ? activeTab.dataset.tab : null;
	const isHome = activeTab && activeTab.dataset.folderId === "1";
                if (isHome) return;
        if (gridItem.dataset.type === 'file') {
            gridItem.style.transform = 'scale(0.95)';
            setTimeout(() => gridItem.style.transform = 'none', 150);
            return;
        }
        const folderId = parseInt(gridItem.dataset.id);
        navigateTo(folderId, win, tabId, true);
        return;
    }

    const header = e.target.closest('.os-window-header');
    if (header && !e.target.closest('.window-btn')) {
        const win = header.closest('.os-window');
        const maxBtn = win.querySelector('.btn-maximize');
        if (maxBtn) toggleMaximize(win, maxBtn, false);
    }
});

function toggleMaximize(win, btn, isFullscreen = false, skipTransition = false) {
    win.classList.remove('os-window-opening');
    const isCurrentlyMaximized = win.dataset.state === 'maximized' || win.dataset.state === 'fullscreen';

    if (!isCurrentlyMaximized && win.style.transform !== 'none' && win.style.transform !== '') {
        const rect = win.getBoundingClientRect();
        win.style.transition = 'none';
        win.style.transform = 'none';
        win.style.left = rect.left + 'px';
        win.style.top = rect.top + 'px';
        void win.offsetWidth; 
    }

    if (!skipTransition) {
        win.style.willChange = 'top, left, width, height, transform, border-radius';
        win.style.transition = 'top 0.3s cubic-bezier(0.22, 1, 0.36, 1), left 0.3s cubic-bezier(0.22, 1, 0.36, 1), width 0.3s cubic-bezier(0.22, 1, 0.36, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1), transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
    }

    const svg = btn ? btn.querySelector('svg') : null;
    
    if (win.dataset.state === 'maximized' || win.dataset.state === 'fullscreen') {
        win.classList.remove('window-maximized', 'window-fullscreen');
        win.dataset.state = 'normal';
        if (svg) svg.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
        document.body.classList.remove('fullscreen-ui');
    } else {
        win.dataset.state = isFullscreen ? 'fullscreen' : 'maximized';
        if (isFullscreen) {
            win.classList.add('window-fullscreen');
            document.body.classList.add('fullscreen-ui');
        } else {
            win.classList.add('window-maximized');
            document.body.classList.remove('fullscreen-ui');
        }
        if (svg) svg.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
    }

    if (!skipTransition) {
        setTimeout(() => { 
            win.style.transition = ''; 
            win.style.willChange = 'auto';
        }, 300);
    }
}

document.getElementById('topTrigger').addEventListener('mouseenter', () => {
    if (document.body.classList.contains('fullscreen-ui')) document.body.classList.add('show-top');
});
document.getElementById('topTrigger').addEventListener('mouseleave', () => {
    document.body.classList.remove('show-top');
});
document.querySelector('.top-bar').addEventListener('mouseenter', () => {
    if (document.body.classList.contains('fullscreen-ui')) document.body.classList.add('show-top');
});
document.querySelector('.top-bar').addEventListener('mouseleave', () => {
    document.body.classList.remove('show-top');
});

document.getElementById('bottomTrigger').addEventListener('mouseenter', () => {
    if (document.body.classList.contains('fullscreen-ui')) document.body.classList.add('show-bottom');
});
document.getElementById('bottomTrigger').addEventListener('mouseleave', () => {
    document.body.classList.remove('show-bottom');
});
document.querySelector('.bottom-dock').addEventListener('mouseenter', () => {
    if (document.body.classList.contains('fullscreen-ui')) document.body.classList.add('show-bottom');
});
document.querySelector('.bottom-dock').addEventListener('mouseleave', () => {
    document.body.classList.remove('show-bottom');
});

let isDragging = false, isResizing = false;
let currentWin = null, currentHandle = null;
let offsetX, offsetY, startX, startY, startWidth, startHeight, startLeft, startTop;

document.addEventListener('mousedown', (e) => {
    if (e.target.closest('.window-btn') || e.target.closest('svg') || e.target.closest('.window-maximize-menu')) return;
    
    const handle = e.target.closest('.resize-handle');
    if (handle) {
        currentWin = handle.closest('.os-window');
        if (currentWin.dataset.state === 'maximized' || currentWin.dataset.state === 'fullscreen') return;
        
        currentWin.classList.remove('os-window-opening');
        isResizing = true;
        currentHandle = handle;
        
        if (currentWin.style.transform !== 'none' && currentWin.style.transform !== '') {
            const rect = currentWin.getBoundingClientRect();
            currentWin.style.transform = 'none';
            currentWin.style.left = rect.left + 'px';
            currentWin.style.top = rect.top + 'px';
        }
        
        startX = e.clientX; startY = e.clientY;
        const rect = currentWin.getBoundingClientRect();
        startWidth = rect.width; startHeight = rect.height;
        startLeft = currentWin.offsetLeft; startTop = currentWin.offsetTop;
        e.preventDefault();
        return;
    }
    
    const header = e.target.closest('.os-window-header');
    if (header) {
        currentWin = header.closest('.os-window');
        currentWin.classList.remove('os-window-opening');
        
        isDragging = true;
        if (currentWin.dataset.state === 'maximized' || currentWin.dataset.state === 'fullscreen') {
            const maxBtn = currentWin.querySelector('.btn-maximize');
            const initialRect = currentWin.getBoundingClientRect();
            
            const ratioX = (e.clientX - initialRect.left) / initialRect.width;
            const grabY = e.clientY - initialRect.top;
            
            toggleMaximize(currentWin, maxBtn, false, true);
            
            const newWidth = currentWin.offsetWidth;
            offsetX = newWidth * ratioX;
            offsetY = grabY;
            
            currentWin.style.left = (e.clientX - offsetX) + 'px';
            currentWin.style.top = (e.clientY - offsetY) + 'px';
        } else {
            if (currentWin.style.transform !== 'none' && currentWin.style.transform !== '') {
                const rect = currentWin.getBoundingClientRect();
                currentWin.style.transform = 'none';
                currentWin.style.left = rect.left + 'px';
                currentWin.style.top = rect.top + 'px';
            }
            offsetX = e.clientX - currentWin.offsetLeft;
            offsetY = e.clientY - currentWin.offsetTop;
        }
        e.preventDefault();
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging && currentWin) {
        currentWin.style.left = (e.clientX - offsetX) + 'px';
        currentWin.style.top = (e.clientY - offsetY) + 'px';
    } else if (isResizing && currentWin) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (currentHandle.classList.contains('res-e') || currentHandle.classList.contains('res-se') || currentHandle.classList.contains('res-ne')) {
            currentWin.style.width = `${Math.max(400, startWidth + dx)}px`;
        }
        if (currentHandle.classList.contains('res-s') || currentHandle.classList.contains('res-se') || currentHandle.classList.contains('res-sw')) {
            currentWin.style.height = `${Math.max(300, startHeight + dy)}px`;
        }
        if (currentHandle.classList.contains('res-w') || currentHandle.classList.contains('res-sw') || currentHandle.classList.contains('res-nw')) {
            const newWidth = startWidth - dx;
            if (newWidth > 400) {
                currentWin.style.left = `${startLeft + dx}px`;
                currentWin.style.width = `${newWidth}px`;
            }
        }
        if (currentHandle.classList.contains('res-n') || currentHandle.classList.contains('res-nw') || currentHandle.classList.contains('res-ne')) {
            const newHeight = startHeight - dy;
            if (newHeight > 300) {
                currentWin.style.top = `${startTop + dy}px`;
                currentWin.style.height = `${newHeight}px`;
            }
        }
    }
});

const endDrag = () => {
    isDragging = false;
    isResizing = false;
    currentWin = null;
    currentHandle = null;
};

window.addEventListener('mouseup', endDrag);
window.addEventListener('blur', endDrag);

const dbName = "arOS_VFS";
let db;
const tabsState = {};

function initDB() {
    return new Promise((resolve) => {
        const request = indexedDB.open(dbName, 4);
        request.onupgradeneeded = (e) => {
            db = e.target.result;
            let store;
            if (!db.objectStoreNames.contains("files")) {
                store = db.createObjectStore("files", { keyPath: "id", autoIncrement: true });
                store.createIndex("parentId", "parentId", { unique: false });
            } else {
                store = e.target.transaction.objectStore("files");
                store.clear();
            }
            
            store.put({ id: 101, parentId: 3, name: "Files", type: "folder" });
            store.put({ id: 102, parentId: 3, name: "Important Tasks", type: "folder" });
            store.put({ id: 103, parentId: 3, name: "Welcome", type: "file", ext: "aep" });
            store.put({ id: 105, parentId: 102, name: "Project arOS", type: "folder" });
            store.put({ id: 104, parentId: 102, name: "To-Do List", type: "file", ext: "txt" });
            
            store.put({ id: 801, parentId: 8, name: "Apps", type: "folder" });
            store.put({ id: 802, parentId: 8, name: "arOS", type: "folder" });
            store.put({ id: 803, parentId: 8, name: "Library", type: "folder" });
            store.put({ id: 804, parentId: 8, name: "Users", type: "folder" });

            store.put({ id: 501, parentId: 5, name: "Wallpapers", type: "folder" });
            store.put({ id: 5011, parentId: 501, name: "arOSLight.png", type: "file", ext: "png", url: "Assets/BG.png" });
            store.put({ id: 5012, parentId: 501, name: "arOSDark.png", type: "file", ext: "png", url: "Assets/BGDark.png" });
            store.put({ id: 5013, parentId: 501, name: "Mountains.png", type: "file", ext: "png", url: "Assets/BG1.png" });
            store.put({ id: 5014, parentId: 501, name: "Lake.png", type: "file", ext: "png", url: "Assets/BG2.png" });
            store.put({ id: 5015, parentId: 501, name: "City.png", type: "file", ext: "png", url: "Assets/BG3.png" });
            store.put({ id: 5016, parentId: 501, name: "Houses.png", type: "file", ext: "png", url: "Assets/BG4.png" });

            store.put({ id: 999, parentId: null, name: "Recycle Bin", type: "folder" });
        };
        request.onsuccess = (e) => { db = e.target.result; resolve(); };
    });
}

function getFiles(parentId) {
    return new Promise((resolve) => {
        const tx = db.transaction("files", "readonly");
        const index = tx.objectStore("files").index("parentId");
        const req = index.getAll(parentId);
        req.onsuccess = () => resolve(req.result);
    });
}

function getFileById(id) {
    return new Promise((resolve) => {
        const tx = db.transaction("files", "readonly");
        const req = tx.objectStore("files").get(id);
        req.onsuccess = () => resolve(req.result);
    });
}

async function getHomeHTML() {
    const countDesktop = (await getFiles(2)).length;
    const countDocuments = (await getFiles(3)).length;
    const countDownloads = (await getFiles(4)).length;
    const countImages = (await getFiles(5)).length;
    const countMusic = (await getFiles(6)).length;
    const countVideos = (await getFiles(7)).length;

    return `
        <div class="files-home-header">
            <h2>Home <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></h2>
        </div>
        <div class="files-section">
            <h3 class="files-section-title">Recent files</h3>
            <div class="files-empty-text">No recent files opened yet, go open some files!</div>
        </div>
        <div class="files-section">
            <h3 class="files-section-title">Pinned</h3>
            <div class="files-grid">
                <div class="files-grid-item" data-id="2">
                    <div class="files-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#007aff" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
                    <div class="files-item-info"><span class="files-item-name">Desktop</span><span class="files-item-count">${countDesktop} item${countDesktop !== 1 ? 's' : ''}</span></div>
                </div>
                <div class="files-grid-item" data-id="3">
                    <div class="files-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#34c759" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
                    <div class="files-item-info"><span class="files-item-name">Documents</span><span class="files-item-count">${countDocuments} item${countDocuments !== 1 ? 's' : ''}</span></div>
                </div>
                <div class="files-grid-item" data-id="4">
                    <div class="files-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#5856d6" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></div>
                    <div class="files-item-info"><span class="files-item-name">Downloads</span><span class="files-item-count">${countDownloads} item${countDownloads !== 1 ? 's' : ''}</span></div>
                </div>
                <div class="files-grid-item" data-id="5">
                    <div class="files-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
                    <div class="files-item-info"><span class="files-item-name">Images</span><span class="files-item-count">${countImages} item${countImages !== 1 ? 's' : ''}</span></div>
                </div>
                <div class="files-grid-item" data-id="6">
                    <div class="files-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#ff2d55" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>
                    <div class="files-item-info"><span class="files-item-name">Music</span><span class="files-item-count">${countMusic} item${countMusic !== 1 ? 's' : ''}</span></div>
                </div>
                <div class="files-grid-item" data-id="7">
                    <div class="files-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#af52de" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg></div>
                    <div class="files-item-info"><span class="files-item-name">Videos</span><span class="files-item-count">${countVideos} item${countVideos !== 1 ? 's' : ''}</span></div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', async () => {
    await initDB();
    
    setTimeout(() => {
        document.querySelectorAll('.files-sidebar-container').forEach(sidebar => {
            const highlight = sidebar.querySelector('.files-sidebar-highlight');
            const activeItem = sidebar.querySelector('.files-sidebar-item.active');
            if (highlight && activeItem) {
                highlight.style.transform = `translateY(${activeItem.offsetTop}px)`;
            }
        });
    }, 100);
});

function getFileOrFolderIcon(item) {
    if (item.type === 'folder') {
        let imprint = '';
        if (item.id === 801) { // Apps
            imprint = '<g stroke="#D48D00" stroke-width="3" fill="none"><rect x="38" y="48" width="10" height="10" rx="2"/><rect x="52" y="48" width="10" height="10" rx="2"/><rect x="38" y="62" width="10" height="10" rx="2"/><rect x="52" y="62" width="10" height="10" rx="2"/></g>';
        } else if (item.id === 802) { // arOS
            imprint = '<path d="M 43.6,0.0 L 0.0,50.9 L 3.6,54.7 L 74.5,54.7 L 76.4,60.4 L 54.5,81.1 L 50.9,69.8 L 41.8,69.8 L 41.8,96.2 L 50.9,98.1 L 90.9,60.4 L 98.2,49.1 L 94.5,45.3 L 21.8,45.3 L 20.0,41.5 L 38.2,22.6 L 41.8,24.5 L 41.8,32.1 L 52.7,30.2 L 50.9,0.0 Z" fill="#D48D00" transform="translate(38, 48) scale(0.24)"/>';
        } else if (item.id === 803) { // Library
            imprint = '<g stroke="#D48D00" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="none"><path d="M32 70 L68 70 M36 75 L64 75 M50 47 L32 57 L68 57 Z M37 57 V70 M45.6 57 V70 M54.3 57 V70 M63 57 V70"/></g>';
        } else if (item.id === 804) { // Users
            imprint = '<g stroke="#D48D00" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="none"><circle cx="50" cy="52" r="7"/><path d="M35 72 C35 63.7157 41.7157 57 50 57 C58.2843 57 65 63.7157 65 72"/></g>';
        }
        return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
            <path d="M15 28 C15 23.5817 18.5817 20 23 20 H42 L50 28 H82 C86.4183 28 90 31.5817 90 36 V80 C90 84.4183 86.4183 88 82 88 H18 C13.5817 88 10 84.4183 10 80 V33 C10 30.2386 12.2386 28 15 28 Z" fill="#ECA204"/>
            <path d="M10 40 C10 35.5817 13.5817 32 18 32 H82 C86.4183 32 90 35.5817 90 40 V80 C90 84.4183 86.4183 88 82 88 H18 C13.5817 88 10 84.4183 10 80 V40 Z" fill="url(#folderGrad-${item.id})"/>
            ${imprint}
            <defs>
                <linearGradient id="folderGrad-${item.id}" x1="50" y1="32" x2="50" y2="88" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFD645"/>
                    <stop offset="1" stop-color="#FFB200"/>
                </linearGradient>
            </defs>
        </svg>`;
        } else {
        if (item.ext === 'png' || item.ext === 'jpg' || item.ext === 'jpeg') {
            const imgUrl = item.url || `Assets/${item.name}`;
            return `<div style="width:100%; height:100%; border-radius:6px; background-image:url('${imgUrl}'); background-size:cover; background-position:center; box-shadow: 0 2px 6px rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.05);"></div>`;
        }
        return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
            <path d="M24 7 H64 L84 27 V85 C84 89.4183 80.4183 93 76 93 H24 C19.5817 93 16 89.4183 16 85 V15 C16 10.5817 19.5817 7 24 7 Z" fill="url(#fileGrad-${item.id})"/>
            <path d="M64 7 V27 H84" fill="#00A770" opacity="0.5"/>
            <path d="M40 45 L60 65 M60 45 L40 65" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
            <defs>
                <linearGradient id="fileGrad-${item.id}" x1="50" y1="7" x2="50" y2="93" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00D28F"/>
                    <stop offset="1" stop-color="#00B87A"/>
                </linearGradient>
            </defs>
        </svg>`;
    }
}

function getTabState(tabId) {
    if (!tabsState[tabId]) {
        tabsState[tabId] = { history: [1], currentIndex: 0 };
    }
    return tabsState[tabId];
}

async function navigateTo(folderId, win, tabId, recordHistory = true, targetElement = null, skipAnimation = false) {
    const state = getTabState(tabId);
    
    if (recordHistory) {
        state.history = state.history.slice(0, state.currentIndex + 1);
        state.history.push(folderId);
        state.currentIndex++;
    }
    
    updateNavButtons(win, tabId);

    let title = "Folder";
    let iconHtml = '';

    const hc = {
        0: { t: "Recents", c: "#555", i: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', f: "none" },
        1: { t: "Home", c: "#e67e22", i: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', f: "none" },
        2: { t: "Desktop", c: "#007aff", i: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>', f: "none" },
        3: { t: "Documents", c: "#34c759", i: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>', f: "none" },
        4: { t: "Downloads", c: "#5856d6", i: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>', f: "none" },
        5: { t: "Images", c: "#ff9500", i: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>', f: "none" },
        6: { t: "Music", c: "#ff2d55", i: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>', f: "none" },
        7: { t: "Videos", c: "#af52de", i: '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>', f: "none" },
        8: { t: "Internal Storage", c: "#555", i: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>', f: "none" },
        9: { t: "Data", c: "#555", i: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>', f: "none" },
        10: { t: "Cloudbay", c: "#555", i: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>', f: "none" },
        11: { t: "iCloud", c: "#555", i: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>', f: "none" },
        12: { t: "Google Drive", c: "#555", i: '<polygon points="12 2 2 22 22 22"/>', f: "none" },
        13: { t: "Urgent", c: "#ff3b30", isDot: true },
        14: { t: "Fun", c: "#ffcc00", isDot: true },
        15: { t: "Works", c: "#007aff", isDot: true },
        999: { t: "Recycle Bin", c: "#ff3b30", i: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>', f: "none" }
    };

    if (hc[folderId]) {
        title = hc[folderId].t;
        if (hc[folderId].isDot) {
            iconHtml = `<div class="files-tag-dot" style="background: ${hc[folderId].c}; width: 8px; height: 8px; border-radius: 50%; box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);"></div>`;
        } else {
            iconHtml = `<svg viewBox="0 0 24 24" fill="${hc[folderId].f}" stroke="${hc[folderId].c}" stroke-width="2" style="width:14px;height:14px;">${hc[folderId].i}</svg>`;
        }
    } else {
        const fileObj = await getFileById(folderId);
        if (fileObj) {
            title = fileObj.name;
            if (fileObj.type === 'folder') {
                iconHtml = '<svg viewBox="0 0 24 24" fill="#ffcc00" stroke="none" style="width:14px;height:14px;"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>';
            } else {
                iconHtml = '<svg viewBox="0 0 24 24" fill="#00D28F" stroke="none" style="width:14px;height:14px;"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/></svg>';
            }
        }
    }

    const sidebar = win.querySelector('.files-sidebar-container');
    if(sidebar) {
        sidebar.querySelectorAll('.files-sidebar-item').forEach(i => i.classList.remove('active'));
        const activeSidebarItem = sidebar.querySelector(`.files-sidebar-item[data-id="${folderId}"]`);
        if (activeSidebarItem) {
            activeSidebarItem.classList.add('active');
            const highlight = sidebar.querySelector('.files-sidebar-highlight');
            if (highlight) highlight.style.transform = `translateY(${activeSidebarItem.offsetTop}px)`;
        }
    }
    
    const activeTab = win.querySelector('.files-tab.active');
    if(activeTab) {
        activeTab.dataset.folderId = folderId;
        const tabWrap = activeTab.querySelector('.tab-content-wrap');
        if(tabWrap) {
            const oldInners = tabWrap.querySelectorAll('.tab-inner');
            oldInners.forEach(inner => {
                inner.classList.remove('tab-fade-in');
                inner.classList.add('tab-fade-out');
                setTimeout(() => inner.remove(), 500);
            });
            const newInner = document.createElement('div');
            newInner.className = 'tab-inner tab-fade-in';
            newInner.innerHTML = `${iconHtml}<span style="font-size: 11px; color: #555; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${title}</span>`;
            tabWrap.appendChild(newInner);
        }
    }

    const wrapper = win.querySelector('#filesMainContentWrapper');
    if(!wrapper) return;
    
    const activeViewWrap = wrapper.querySelector('.tab-view-wrapper.active');
    if(!activeViewWrap) return;
    
    let newHTML = '';
    
    if (folderId === 1) {
        newHTML = await getHomeHTML();
    } else if (folderId === 8) {
        const items = await getFiles(folderId);
        items.sort((a, b) => {
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;
            return a.name.localeCompare(b.name);
        });
        let gridHtml = '';
        if(items.length > 0) {
            gridHtml = `<div class="files-grid">`;
            items.forEach(item => {
                gridHtml += `
                <div class="files-grid-item plain-item" data-id="${item.id}" data-type="${item.type}" style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px;">
                    <div style="width: 48px; height: 48px; display: flex; justify-content: center; align-items: center;">
                        ${getFileOrFolderIcon(item)}
                    </div>
                    <span class="files-item-name" style="font-size: 11px; color: #111; font-weight: 500;">${item.name}</span>
                </div>`;
            });
            gridHtml += `</div>`;
        }

        const itemCountText = `<div class="files-status-bar">${items.length} item${items.length !== 1 ? 's' : ''}</div>`;
        newHTML = `
            <div class="files-home-header">
                <h2>Internal Storage <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></h2>
            </div>
            <div class="storage-overview-card">
                <div class="storage-chart-container">
                    <svg viewBox="0 0 36 36" class="circular-chart">
                        <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path class="circle apps" stroke-dasharray="20, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path class="circle system" stroke-dasharray="15, 100" stroke-dashoffset="-20" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path class="circle pictures" stroke-dasharray="10, 100" stroke-dashoffset="-35" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path class="circle audio" stroke-dasharray="5, 100" stroke-dashoffset="-45" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div class="chart-text">N%</div>
                </div>
                <div class="storage-info">
                    <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 12px; align-items: center;">
                        <h3 style="margin:0; font-size:14px; font-weight:600; color:#111;">Null TB free of 2 TB</h3>
                        <div class="window-btn" style="width: 24px; height: 24px; border-radius: 50%; background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0, 0, 0, 0.08); box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.5);"><svg viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></div>
                    </div>
                    <div class="storage-legend">
                        <div class="legend-item"><span class="dot" style="background:#ff3b30;"></span><span class="lbl">Apps</span><span class="val">Null GB</span></div>
                        <div class="legend-item"><span class="dot" style="background:#ffcc00;"></span><span class="lbl">Audio</span><span class="val">Null GB</span></div>
                        <div class="legend-item"><span class="dot" style="background:#5856d6;"></span><span class="lbl">Installation Files</span><span class="val">Null GB</span></div>
                        <div class="legend-item"><span class="dot" style="background:#007aff;"></span><span class="lbl">System</span><span class="val">Null GB</span></div>
                        <div class="legend-item"><span class="dot" style="background:#ff2d55;"></span><span class="lbl">Videos</span><span class="val">Null GB</span></div>
                        <div class="legend-item"><span class="dot" style="background:#8e8e93;"></span><span class="lbl">Others</span><span class="val">Null GB</span></div>
                        <div class="legend-item"><span class="dot" style="background:#34c759;"></span><span class="lbl">Pictures</span><span class="val">Null GB</span></div>
                        <div class="legend-item"><span class="dot" style="background:#32ade6;"></span><span class="lbl">Documents</span><span class="val">Null GB</span></div>
                        <div class="legend-item"><span class="dot" style="background:#c7c7cc;"></span><span class="lbl">Temporary Files</span><span class="val">Null GB</span></div>
                    </div>
                </div>
            </div>
            ${gridHtml}
        `;
    } else {
        const items = await getFiles(folderId);
        items.sort((a, b) => {
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;
            return a.name.localeCompare(b.name);
        });
        let gridHtml = '';
        if(items.length === 0) {
            gridHtml = `<div class="files-empty-text">This folder is empty.</div>`;
        } else {
            gridHtml = `<div class="files-grid">`;
            items.forEach(item => {
                gridHtml += `
                <div class="files-grid-item plain-item" data-id="${item.id}" data-type="${item.type}" style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px;">
                    <div style="width: 48px; height: 48px; display: flex; justify-content: center; align-items: center;">
                        ${getFileOrFolderIcon(item)}
                    </div>
                    <span class="files-item-name" style="font-size: 11px; color: #111; font-weight: 500;">${item.name}</span>
                </div>`;
            });
            gridHtml += `</div>`;
        }
        const itemCountText = `<div class="files-status-bar">${items.length} item${items.length !== 1 ? 's' : ''}</div>`;
        newHTML = `
            <div class="files-home-header">
                <h2>${title} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></h2>
            </div>
            ${gridHtml}
            ${itemCountText}
        `;
    }
    
    if (skipAnimation) {
        let currentView = activeViewWrap.querySelector('.files-view:not(.view-slide-out-left)');
        if (currentView) {
            currentView.innerHTML = newHTML;
        } else {
            activeViewWrap.innerHTML = `<div class="files-view view-slide-in-right" style="z-index: 1;">${newHTML}</div>`;
        }
    } else {
        const oldViews = activeViewWrap.querySelectorAll('.files-view');
        oldViews.forEach(view => {
            view.style.overflow = 'hidden'; 
            view.style.pointerEvents = 'none';
            view.style.zIndex = '0';
            view.classList.remove('view-slide-in-right');
            view.classList.add('view-slide-out-left');
            setTimeout(() => { if (view.parentNode) view.remove(); }, 500);
        });
        
        const newView = document.createElement('div');
        newView.className = 'files-view view-slide-in-right';
        newView.style.zIndex = '1';
        newView.innerHTML = newHTML;
        activeViewWrap.appendChild(newView);
    }
    
    const searchInput = win.querySelector('.files-search-input');
    if (searchInput) searchInput.value = '';
}

document.addEventListener('click', async (e) => {
    const win = e.target.closest('.os-window');
    if (!win) return;
    
    const activeTab = win.querySelector('.files-tab.active');
    const tabId = activeTab ? activeTab.dataset.tab : null;
    
    const sidebarItem = e.target.closest('.files-sidebar-item');
    const gridItem = e.target.closest('.files-grid-item');
    
    if (gridItem) {
        const allItems = win.querySelectorAll('.files-grid-item');
        const isHome = activeTab && activeTab.dataset.folderId === "1";
        if (isHome) {
            const folderId = parseInt(gridItem.dataset.id);
            if (folderId) navigateTo(folderId, win, tabId, true);
            return;
        } else {
            if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
                allItems.forEach(i => i.classList.remove('selected'));
            }
            gridItem.classList.add('selected');
        }
    }

    if (sidebarItem && sidebarItem.dataset.id && tabId) {
        const folderId = parseInt(sidebarItem.dataset.id);
        navigateTo(folderId, win, tabId, true, sidebarItem);
        return;
    }

    const closeBtn = e.target.closest('.btn-close');
    if (closeBtn && !e.target.closest('.tab-close-btn')) {
        win.classList.remove('os-window-opening');
        
        win.style.willChange = 'transform, opacity';
        win.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
        win.style.opacity = '0';
        
        let currentTransform = win.style.transform;
        if (!currentTransform || currentTransform === 'none') {
            currentTransform = '';
        }
        win.style.transform = `${currentTransform} translateY(40px)`.trim();
        win.style.pointerEvents = 'none';

        setTimeout(() => {
            openWindows = openWindows.filter(w => w !== win);
            win.remove();
            updateDockIndicator();
            if (openWindows.length === 0) {
                document.body.classList.remove('fullscreen-ui');
            }
        }, 300);
        return;
    }

    const navBack = e.target.closest('.nav-btn-back');
    if (navBack && tabId) {
        const state = getTabState(tabId);
        if (state.currentIndex > 0) {
            state.currentIndex--;
            navigateTo(state.history[state.currentIndex], win, tabId, false);
        }
        return;
    }

    const navForward = e.target.closest('.nav-btn-forward');
    if (navForward && tabId) {
        const state = getTabState(tabId);
        if (state.currentIndex < state.history.length - 1) {
            state.currentIndex++;
            navigateTo(state.history[state.currentIndex], win, tabId, false);
        }
        return;
    }

    const navUp = e.target.closest('.nav-btn-up');
    if (navUp && tabId) {
        const state = getTabState(tabId);
        const currentId = state.history[state.currentIndex];
        if (currentId !== 1) {
            const currentObj = await getFileById(currentId);
            const parentId = currentObj ? currentObj.parentId : 1;
            navigateTo(parentId, win, tabId, true);
        }
        return;
    }

    const navRefresh = e.target.closest('.nav-btn-refresh');
    if (navRefresh && tabId) {
        const icon = navRefresh.querySelector('svg');
        if (icon) {
            icon.style.transition = 'transform 0.5s ease';
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => { icon.style.transition = 'none'; icon.style.transform = 'none'; }, 500);
        }
        const state = getTabState(tabId);
        navigateTo(state.history[state.currentIndex], win, tabId, false);
        return;
    }

    const otherBtn = e.target.closest('.window-btn');
    if (otherBtn && !e.target.closest('.os-window-controls') && !e.target.closest('.tab-close-btn') && !otherBtn.classList.contains('nav-btn-back') && !otherBtn.classList.contains('nav-btn-forward') && !otherBtn.classList.contains('nav-btn-up') && !otherBtn.classList.contains('nav-btn-refresh') && !otherBtn.classList.contains('btn-new-tab')) {
        const oldBg = otherBtn.style.backgroundColor;
        otherBtn.style.backgroundColor = 'rgba(0,0,0,0.1)';
        setTimeout(() => otherBtn.style.backgroundColor = oldBg, 150);
    }
});

let searchTimeout;
document.addEventListener('input', (e) => {
    if (e.target.classList.contains('files-search-input')) {
        const val = e.target.value.toLowerCase();
        const win = e.target.closest('.os-window');
        if (!win) return;
        const activeTab = win.querySelector('.files-tab.active');
        const tabId = activeTab ? activeTab.dataset.tab : null;
        const folderId = parseInt(activeTab ? activeTab.dataset.folderId : 1);
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            const activeViewWrap = win.querySelector('.tab-view-wrapper.active');
            if (!activeViewWrap) return;
            const view = activeViewWrap.querySelector('.files-view');
            if (!view) return;
            if (val.trim() === '') {
                navigateTo(folderId, win, tabId, false);
                return;
            }
            let allItems = [];
            if (folderId === 1 || folderId === 8) {
                const tx = db.transaction("files", "readonly");
                const req = tx.objectStore("files").getAll();
                req.onsuccess = () => {
                    allItems = req.result.filter(item => item.name.toLowerCase().includes(val));
                    renderSearchResults(allItems, view, val);
                };
            } else {
                async function getDeep(pId) {
                    let res = [];
                    const kids = await getFiles(pId);
                    for (const k of kids) {
                        res.push(k);
                        if (k.type === 'folder') res.push(...await getDeep(k.id));
                    }
                    return res;
                }
                allItems = await getDeep(folderId);
                allItems = allItems.filter(item => item.name.toLowerCase().includes(val));
                renderSearchResults(allItems, view, val);
            }
        }, 300);
    }
});

function renderSearchResults(items, view, query) {
    let gridHtml = '';
    if (items.length === 0) {
        gridHtml = `<div class="files-empty-text">No results found for "${query}"</div>`;
    } else {
        gridHtml = `<div class="files-grid">`;
        items.forEach(item => {
            gridHtml += `
            <div class="files-grid-item plain-item" data-id="${item.id}" data-type="${item.type}" style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px;">
                <div style="width: 48px; height: 48px; display: flex; justify-content: center; align-items: center;">
                    ${getFileOrFolderIcon(item)}
                </div>
                <span class="files-item-name" style="font-size: 11px; color: #111; font-weight: 500;">${item.name}</span>
            </div>`;
        });
        gridHtml += `</div>`;
    }
    const itemCountText = `<div class="files-status-bar">${items.length} item${items.length !== 1 ? 's' : ''}</div>`;
    view.innerHTML = `
        <div class="files-home-header">
            <h2>Search Results <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></h2>
        </div>
        ${gridHtml}
        ${itemCountText}
    `;
}

let fsClipboard = { action: null, items: [] };

document.addEventListener('click', (e) => {
    const btnListView = e.target.closest('.btn-list-view');
    if (btnListView) {
        const win = btnListView.closest('.os-window');
        const activeView = win.querySelector('.tab-view-wrapper.active .files-view');
        if (activeView) {
            const grid = activeView.querySelector('.files-grid');
            if (grid) grid.classList.add('files-list-layout');
        }
        return;
    }

    const btnGridView = e.target.closest('.btn-grid-view');
    if (btnGridView) {
        const win = btnGridView.closest('.os-window');
        const activeView = win.querySelector('.tab-view-wrapper.active .files-view');
        if (activeView) {
            const grid = activeView.querySelector('.files-grid');
            if (grid) grid.classList.remove('files-list-layout');
        }
        return;
    }

    const btnShare = e.target.closest('.btn-share');
    if (btnShare) { alert("Share dialog opened"); return; }

    const btnTags = e.target.closest('.btn-tags');
    if (btnTags) { alert("Tags menu opened"); return; }

    const btnMore = e.target.closest('.btn-more');
    if (btnMore) { alert("More options menu opened"); return; }

    const btnRename = e.target.closest('.btn-rename');
    if (btnRename) {
        const win = btnRename.closest('.os-window');
        const activeView = win.querySelector('.tab-view-wrapper.active .files-view');
        const activeTab = win.querySelector('.files-tab.active');
        if (activeView && activeTab) {
            const selected = activeView.querySelectorAll('.files-grid-item.selected');
            if (selected.length === 1) {
                const nameSpan = selected[0].querySelector('.files-item-name');
                const currentName = nameSpan.textContent;
                
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'inline-rename-input';
                input.value = currentName;
                
                nameSpan.replaceWith(input);
                input.focus();
                input.select();
                
                let isRenaming = false;
                const finishRename = () => {
                    if (isRenaming) return;
                    isRenaming = true;
                    const newName = input.value.trim();
                    if (newName && newName !== currentName) {
                        const folderId = parseInt(activeTab.dataset.folderId || 1);
                        if (folderId !== 1) {
                            const tx = db.transaction("files", "readwrite");
                            const store = tx.objectStore("files");
                            const req = store.get(parseInt(selected[0].dataset.id));
                            req.onsuccess = () => {
                                if (req.result) {
                                    req.result.name = newName;
                                    store.put(req.result).onsuccess = () => {
                                        navigateTo(folderId, win, activeTab.dataset.tab, false, null, true);
                                    };
                                }
                            };
                        }
                    } else {
                        input.replaceWith(nameSpan);
                    }
                };
                
                input.addEventListener('blur', finishRename);
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
                    if (e.key === 'Escape') { 
                        isRenaming = true; 
                        input.replaceWith(nameSpan); 
                    }
                });
                
            } else if (selected.length > 1) {
                showErrorModal("Rename Action", "Please select only one item to rename.");
            }
        }
        return;
    }

    const btnCopy = e.target.closest('.btn-copy');
    if (btnCopy) {
        const win = btnCopy.closest('.os-window');
        const activeView = win.querySelector('.tab-view-wrapper.active .files-view');
        if (activeView) {
            const selected = activeView.querySelectorAll('.files-grid-item.selected');
            if (selected.length > 0) {
                fsClipboard = { action: 'copy', items: Array.from(selected).map(el => parseInt(el.dataset.id)) };
            }
        }
        return;
    }

    const btnCut = e.target.closest('.btn-cut');
    if (btnCut) {
        const win = btnCut.closest('.os-window');
        const activeView = win.querySelector('.tab-view-wrapper.active .files-view');
        if (activeView) {
            const selected = activeView.querySelectorAll('.files-grid-item.selected');
            if (selected.length > 0) {
                fsClipboard = { action: 'cut', items: Array.from(selected).map(el => parseInt(el.dataset.id)) };
            }
        }
        return;
    }
});

document.addEventListener('click', async (e) => {
    const btnNew = e.target.closest('.btn-new');
    if (btnNew) {
        const win = btnNew.closest('.os-window');
        const activeTab = win.querySelector('.files-tab.active');
        if (activeTab) {
            const folderId = parseInt(activeTab.dataset.folderId || 1);
            if (folderId !== 1) {
                const tx = db.transaction("files", "readwrite");
                const store = tx.objectStore("files");
                store.put({ parentId: folderId, name: "New Folder", type: "folder" });
                tx.oncomplete = () => {
                    navigateTo(folderId, win, activeTab.dataset.tab, false, null, true);
                };
            }
        }
        return;
    }

    const btnDelete = e.target.closest('.btn-delete');
    if (btnDelete) {
        const win = btnDelete.closest('.os-window');
        const activeView = win.querySelector('.tab-view-wrapper.active .files-view');
        const activeTab = win.querySelector('.files-tab.active');
        if (activeView && activeTab) {
            const selected = activeView.querySelectorAll('.files-grid-item.selected');
            if (selected.length > 0) {
                const folderId = parseInt(activeTab.dataset.folderId || 1);
                if (folderId !== 1) {
                    const tx = db.transaction("files", "readwrite");
                    const store = tx.objectStore("files");
                    selected.forEach(el => {
                        const id = parseInt(el.dataset.id);
                        if (folderId === 999) {
                            store.delete(id); 
                        } else {
                            const req = store.get(id);
                            req.onsuccess = () => {
                                if (req.result) {
                                    req.result.parentId = 999;
                                    store.put(req.result);
                                }
                            };
                        }
                    });
                    tx.oncomplete = () => {
                        navigateTo(folderId, win, activeTab.dataset.tab, false, null, true);
                    };
                }
            }
        }
        return;
    }

    const btnPaste = e.target.closest('.btn-paste');
    if (btnPaste) {
        const win = btnPaste.closest('.os-window');
        const activeTab = win.querySelector('.files-tab.active');
        if (activeTab && fsClipboard.items.length > 0) {
            const folderId = parseInt(activeTab.dataset.folderId || 1);
            if (folderId !== 1) {
                const tx = db.transaction("files", "readwrite");
                const store = tx.objectStore("files");

                if (fsClipboard.action === 'cut') {
                    let completed = 0;
                    fsClipboard.items.forEach(id => {
                        const req = store.get(id);
                        req.onsuccess = () => {
                            if (req.result) {
                                const isSameFolder = req.result.parentId === folderId;
                                const newName = isSameFolder ? req.result.name + " (Copy)" : req.result.name;
                                const newItem = { ...req.result, parentId: folderId, name: newName };
                                delete newItem.id;
                                store.put(newItem).onsuccess = () => {
                                    completed++;
                                    if (completed === fsClipboard.items.length) {
                                        navigateTo(folderId, win, activeTab.dataset.tab, false, null, true);
                                    }
                                };
                            } else {
                                completed++;
                            }
                        };
                    });
                } else if (fsClipboard.action === 'copy') {
                    const txRead = db.transaction("files", "readonly");
                    const storeRead = txRead.objectStore("files");
                    const itemsToCopy = [];
                    let fetched = 0;
                    if (fsClipboard.items.length === 0) return;
                    fsClipboard.items.forEach(id => {
                        const req = storeRead.get(id);
                        req.onsuccess = () => {
                            if (req.result) itemsToCopy.push(req.result);
                            fetched++;
                            if (fetched === fsClipboard.items.length) {
                                processCopies(itemsToCopy, folderId, win, activeTab.dataset.tab);
                            }
                        };
                    });
                }
            }
        }
        return;
    }

const btnTbSort = e.target.closest('.btn-tb-sort');
    if (btnTbSort) {
        const activeView = btnTbSort.closest('.os-window').querySelector('.tab-view-wrapper.active .files-view');
        const grid = activeView.querySelector('.files-grid');
        if (grid) {
            const items = Array.from(grid.children);
            items.reverse().forEach(item => grid.appendChild(item));
        }
        return;
    }

    const btnTbView = e.target.closest('.btn-tb-view');
    if (btnTbView) {
        const activeView = btnTbView.closest('.os-window').querySelector('.tab-view-wrapper.active .files-view');
        const grid = activeView.querySelector('.files-grid');
        if (grid) grid.classList.toggle('files-list-layout');
        return;
    }

    const btnTbRecycle = e.target.closest('.btn-tb-recycle');
    if (btnTbRecycle) {
        const win = btnTbRecycle.closest('.os-window');
        const activeTab = win.querySelector('.files-tab.active');
        if (activeTab) navigateTo(999, win, activeTab.dataset.tab, true);
        return;
    }

    const btnTbHistory = e.target.closest('.btn-tb-history');
    if (btnTbHistory) {
        const win = btnTbHistory.closest('.os-window');
        const activeTab = win.querySelector('.files-tab.active');
        if (activeTab) navigateTo(0, win, activeTab.dataset.tab, true);
        return;
    }

    const btnTbMore = e.target.closest('.btn-tb-more');
    if (btnTbMore) {
        const win = btnTbMore.closest('.os-window');
        const activeView = win.querySelector('.tab-view-wrapper.active .files-view');
        if (activeView) {
            activeView.querySelectorAll('.files-grid-item').forEach(el => el.classList.add('selected'));
        }
        return;
    }
});

let dragBox = null;
let startDragX = 0, startDragY = 0;
let currentView = null;

document.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    const view = e.target.closest('.files-view');
    if (view && !e.target.closest('.files-grid-item') && !e.target.closest('.files-sidebar-container') && !e.target.closest('.os-window-header')) {
        const win = view.closest('.os-window');
        const activeTab = win.querySelector('.files-tab.active');
        if (activeTab && activeTab.dataset.folderId === "1") return;
        
        currentView = view;
        const rect = view.getBoundingClientRect();
        startDragX = e.clientX;
        startDragY = e.clientY;
        
        dragBox = document.createElement('div');
        dragBox.className = 'selection-box';
        dragBox.style.left = (startDragX - rect.left + view.scrollLeft) + 'px';
        dragBox.style.top = (startDragY - rect.top + view.scrollTop) + 'px';
        dragBox.style.width = '0px';
        dragBox.style.height = '0px';
        view.appendChild(dragBox);
        
        if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
            view.querySelectorAll('.files-grid-item.selected').forEach(el => el.classList.remove('selected'));
        }
    }
});

document.addEventListener('mousemove', (e) => {
    if (dragBox && currentView) {
        const rect = currentView.getBoundingClientRect();
        const currentX = e.clientX;
        const currentY = e.clientY;
        
        const left = Math.min(startDragX, currentX) - rect.left + currentView.scrollLeft;
        const top = Math.min(startDragY, currentY) - rect.top + currentView.scrollTop;
        const width = Math.abs(currentX - startDragX);
        const height = Math.abs(currentY - startDragY);
        
        dragBox.style.left = left + 'px';
        dragBox.style.top = top + 'px';
        dragBox.style.width = width + 'px';
        dragBox.style.height = height + 'px';
        
        const boxRect = dragBox.getBoundingClientRect();
        currentView.querySelectorAll('.files-grid-item').forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const isOverlapping = !(boxRect.right < itemRect.left || 
                                  boxRect.left > itemRect.right || 
                                  boxRect.bottom < itemRect.top || 
                                  boxRect.top > itemRect.bottom);
            if (isOverlapping) {
                item.classList.add('selected');
            } else if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
                item.classList.remove('selected');
            }
        });
    }
});

window.addEventListener('mouseup', () => {
    if (dragBox) {
        dragBox.remove();
        dragBox = null;
        currentView = null;
    }
});

async function processCopies(items, targetFolderId, win, tabId) {
    const existingFiles = await getFiles(targetFolderId);
    const existingNames = new Set(existingFiles.map(f => f.name.toLowerCase()));
    const tx = db.transaction("files", "readwrite");
    const store = tx.objectStore("files");
    let completed = 0;
    
    items.forEach(item => {
        const isSameFolder = item.parentId === targetFolderId;
        let baseName = item.name;
        let newName = baseName;
        
        if (isSameFolder) {
            newName = `${baseName} (Copy)`;
            let counter = 2;
            while (existingNames.has(newName.toLowerCase())) {
                newName = `${baseName} (Copy ${counter})`;
                counter++;
            }
        } else {
            if (existingNames.has(baseName.toLowerCase())) {
                let counter = 2;
                newName = `${baseName} (${counter})`;
                while (existingNames.has(newName.toLowerCase())) {
                    counter++;
                    newName = `${baseName} (${counter})`;
                }
            }
        }
        
        existingNames.add(newName.toLowerCase());
        const newItem = { ...item, parentId: targetFolderId, name: newName };
        delete newItem.id;
        
        store.put(newItem).onsuccess = () => {
            completed++;
            if (completed === items.length) {
                navigateTo(targetFolderId, win, tabId, false, null, true);
            }
        };
    });
}

function updateNavButtons(win, tabId) {
    const state = getTabState(tabId);
    const btnBack = win.querySelector('.nav-btn-back');
    const btnForward = win.querySelector('.nav-btn-forward');
    if (btnBack) {
        if (state.currentIndex > 0) btnBack.classList.remove('disabled');
        else btnBack.classList.add('disabled');
    }
    if (btnForward) {
        if (state.currentIndex < state.history.length - 1) btnForward.classList.remove('disabled');
        else btnForward.classList.add('disabled');
    }
}

function showErrorModal(title, text) {
    const overlay = document.getElementById('errorModalOverlay');
    if (!overlay) return;
    document.getElementById('errorModalTitle').textContent = title;
    document.getElementById('errorModalText').textContent = text;
    overlay.classList.add('active');
    
    document.getElementById('btnErrorModalClose').onclick = () => {
        overlay.classList.remove('active');
    };
}
