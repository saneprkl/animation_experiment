import React from 'react';
import styles from './Game.module.css';
import char from './AnimationSheet_Character.png'

export default function Game() {
    let output;

    
    const startGame = () => {
        
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width = 900;
        const height = canvas.height = 900;

        const character = new Image();
        character.src = char;
        let frames = 0;
        const slowAnimation = 60;
        let charWidth = 33;
        let charHeight = 33;
        let frameX = 0;
        let frameY = 0;

        const animate = () => {
            ctx.clearRect(0,0, width, height);
            ctx.drawImage(character, frameX * charWidth, frameY * charHeight, charHeight, charWidth, 100, 100, 100, 100);
            if (frames % slowAnimation == 0) {
                if (frameX < 1){
                frameX++
                } else{
                frameX = 0;
                }
            }
            frames++;
            requestAnimationFrame(animate);
        }

        output = <>
            { animate() }
        </>
    }

    output = <>
        <div className={ styles.container }>
            <button className={ styles.start } onClick={ () => startGame() }>
                Start game
            </button>
        </div>
            </>
    return (
    <>
    <canvas id="canvas"></canvas>
        { output }
    </>
    )
}