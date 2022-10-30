import React, { useState } from 'react';
import styles from './Game.module.css';
import char from './AnimationSheet_Character.png'

export default function Game() {
    const [active, setActive] = useState('');
    let output;

    
    const startGame = () => {
        
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width = 900;
        const height = canvas.height = 250;

        const character = new Image();
        character.src = char;
        let frames = 0;
        const slowAnimation = 30;
        const charWidth = 33;
        const charHeight = 32.5;
        let charState = 'idle2';

        const animations = [];
        const animationState = [
            {
                name: 'idle',
                frames: 2
            },
            {
                name: 'idle2',
                frames: 2
            },
            {
                name: 'walk',
                frames: 4
            },
            {
                name: 'run',
                frames: 8
            },
            {
                name: 'duck',
                frames: 6
            },
            {
                name: 'jump',
                frames: 8
            },
            {
                name: 'vanish',
                frames: 3
            },
            {
                name: 'die',
                frames: 8
            },
            {
                name: 'attack',
                frames: 8
            }
        ];

        animationState.forEach((state, i) => {
            let frames = {
                loc: [],
            }
            for(let c = 0; c < state.frames; c++){
                let positionX = c * charWidth;
                let positionY = i * charHeight;
                frames.loc.push({x: positionX, y: positionY});
            }
            animations[state.name] = frames;
        })

        const animate = () => {
            ctx.clearRect(0,0, width, height);
            let position = Math.floor(frames/slowAnimation) % animations[charState].loc.length;
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

    const buttonAnimation = (e) => {
        console.log(e.target.id,'button works');
        console.log(e.target.className)
        setActive(e.target.id);
        console.log(e.target.className)
    }

    output = <>
        <div className={ styles.container }>
            <button className={ styles.start } onClick={ () => startGame() }>
                Start Animation
            </button>
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