import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';


function ImageOptions() {
        var div = document.getElementById('imgModal');
        var active = false;
        var currentX;
        var currentY;
        var initialX;
        var initialY;
        var xOffset = 0;
        var yOffset = 0;
        var scale = 1;
        var rotation = 0;

        function rotate(xPos, yPos) {
          var div = document.getElementById('imgModal');
          rotation = rotation + 1;
          div.style.transform = 'rotate('+90*rotation+'deg) scale('+ scale +') translate(' + xPos + 'px, ' + yPos + 'px)';
          // marquer les différents transform en une seule fpois permet de ne pas annuler les précédents
        }

        function zoomIn() {
          scale = 2*scale;
          rotation = rotation - 1; // décrémente rotate pour ne pas tourner
          rotate(0, 0)
        }

        function zoomOut() {
          scale = Math.round(scale/2); //Maths round permet de ne pas dezoom en scale = 1
          rotation = rotation - 1;
          rotate(0, 0)
        }

        function zoomKey(event) {
          if (event.key === 's') {
            zoomOut()
          } else if (event.key === 'z') {
            zoomIn()
          } else if (event.key === 'd') {
            rotate(0, 0)
          }
        }

        function setTranslate(xPos, yPos) {
          rotation = rotation - 1;
          rotate(xPos, yPos);
        }

        function dragStart(e) {
          initialX = e.clientX - xOffset;
          initialY = e.clientY - yOffset;
          active = true;
        }

        function drag(e) {
          console.log(initialX)
          if (active) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            var div = document.getElementById('imgModal');
            setTranslate(currentX, currentY);
          }


        }

        function dragEnd(e) {
          initialX = currentX;
          initialY = currentY;
          active = false;
        }

        return (
          <React.Fragment>
            <div className="imgBox">
              <img id="imgModal" onMouseDown={(e) => dragStart(e)} onMouseMove={(e) => drag(e)} onMouseUp={(e) => dragEnd(e)} src={images[imageIsOpen]}></img>
            </div>
            <div className="buttonBox" onKeyDown={(event) => zoomKey(event)}>
              <button className="button" onClick={() => zoomOut()}><i className="material-icons">&#xe900;</i></button>
              <button className="button" onClick={() => zoomIn()}><i className="material-icons">&#xe8ff;</i></button>
              <button className="button" onClick={() => rotate(0, 0)}><i className="material-icons">&#xe84d;</i></button>
            </div>
          </React.Fragment>
        )

}

export default ImageOptions;
