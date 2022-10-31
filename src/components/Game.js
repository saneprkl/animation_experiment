import React, { useState, useEffect } from 'react';
import styles from './Game.module.css';
import char from './AnimationSheet_Character.png'

export default function Game() {
    const [active, setActive] = useState('1');
    const [activeAnimation, setAnimation] = useState(1);
    let output;

    useEffect(() => {
        startGame();
      }, [activeAnimation]);

    const startGame = () => {
        
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width = 900;
        const height = canvas.height = 250;

        const character = new Image();
        character.src = char;
        let frames = 0;
        let slowAnimation = 50
        const charWidth = 32;
        const charHeight = 32.3;
        let charState = activeAnimation;

        const animations = [];
        const animationState = [
            {
                id: 1,
                name: 'idle',
                frames: 2,
                speed: 40
            },
            {
                id: 2,
                name: 'idle2',
                frames: 2,
                speed: 40
            },
            {
                id: 3,
                name: 'walk',
                frames: 4,
                speed: 20
            },
            {
                id: 4,
                name: 'run',
                frames: 8,
                speed: 14
            },
            {
                id: 5,
                name: 'duck',
                frames: 6,
                speed: 20
            },
            {
                id: 6,
                name: 'jump',
                frames: 8,
                speed: 15
            },
            {
                id: 7,
                name: 'vanish',
                frames: 5,
                speed: 30
            },
            {
                id: 8,
                name: 'die',
                frames: 8,
                speed: 20
            },
            {
                id: 9,
                name: 'attack',
                frames: 8,
                speed: 15
            }
        ];

        // Loop to set correct speed
        for(let i = 0; i < animationState.length; i++){
            if(animationState[i].id == activeAnimation) {
                slowAnimation = animationState[i].speed
            }
        }

        // Function to find coordinates for frames
        animationState.forEach((state, i) => {
            let frames = {
                loc: [],
            }
            for(let c = 0; c < state.frames; c++){
                let positionX = c * charWidth;
                let positionY = i * charHeight;
                frames.loc.push({x: positionX, y: positionY});
            }
            animations[state.id] = frames;
        })

        let lastTimeStamp = 0;
        let deltaTime = 0;
        // Animate character
        const animate = (timeStamp) => {

            // Correct animation speed based on monitor refresh rate
            deltaTime = timeStamp - lastTimeStamp;
            lastTimeStamp = timeStamp
            let render = slowAnimation;

            // 30 Hz
            if(deltaTime > 28) {
                render = slowAnimation / 4.8
            }
            // 60 Hz
            if(deltaTime > 9 && deltaTime < 28) {
                render = slowAnimation / 2.4
            }
            // 120 Hz
            if(deltaTime > 7 && deltaTime < 9) {
                render = slowAnimation / 1.2
            }
            // 240 Hz
            if(deltaTime < 4) {
                render = slowAnimation / 0.6
            }
            // End of speed correction

            ctx.clearRect(0,0, width, height);
            ctx.fillStyle = "#BDB76B"
            ctx.fillRect(0, 0, 500, 500);
            let position = Math.floor(frames/render) % animations[charState].loc.length;
            let frameX = charWidth * position;
            let frameY = animations[charState].loc[position].y;
            ctx.drawImage(character, frameX, frameY, charHeight, charWidth, 100, 100, 100, 100);
            frames++;
            requestAnimationFrame(animate);
        }
        output = <>
            { animate() }
        </>
    }

    // Function to highlight button and activate corresponding animation
    const buttonAnimation = (e) => {
        setActive(e.target.id);
        setAnimation(e.target.id);
        console.log(activeAnimation, "active animation");
    }
    
    output = <>
        <div className={ styles.container }>
        </div>
            </>
    return (
    <>
    <canvas id="canvas"></canvas>
        { output }
        <div className={ styles.buttonContainer }>
            <button key={ 1 } id={ '1' } className={ active === '1' ? styles.animationButton2 : styles.animationButton } onClick={ (e) => buttonAnimation(e) }>Idle</button>
            <button key={ 2 } id={ '2' } className={ active === '2' ? styles.animationButton2 : styles.animationButton } onClick={ (e) => buttonAnimation(e) }>Idle 2</button>
            <button key={ 3 } id={ '3' } className={ active === '3' ? styles.animationButton2 : styles.animationButton } onClick={ (e) => buttonAnimation(e) }>Walk</button>
            <button key={ 4 } id={ '4' } className={ active === '4' ? styles.animationButton2 : styles.animationButton } onClick={ (e) => buttonAnimation(e) }>Run</button>
            <button key={ 5 } id={ '5' } className={ active === '5' ? styles.animationButton2 : styles.animationButton } onClick={ (e) => buttonAnimation(e) }>Duck</button>
            <button key={ 6 } id={ '6' } className={ active === '6' ? styles.animationButton2 : styles.animationButton } onClick={ (e) => buttonAnimation(e) }>Jump</button>
            <button key={ 7 } id={ '7' } className={ active === '7' ? styles.animationButton2 : styles.animationButton } onClick={ (e) => buttonAnimation(e) }>Vanish</button>
            <button key={ 8 } id={ '8' } className={ active === '8' ? styles.animationButton2 : styles.animationButton } onClick={ (e) => buttonAnimation(e) }>Death</button>
            <button key={ 9 } id={ '9' } className={ active === '9' ? styles.animationButton2 : styles.animationButton } onClick={ (e) => buttonAnimation(e) }>Attack</button>
        </div>    
    </>
    )
}