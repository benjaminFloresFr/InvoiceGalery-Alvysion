import './App.css';
import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from '@material-ui/core';
// import { ImageOptions } from './components/ImageOptions';
// import { Modal } from './components/Modal';




function App() {

  // --------------- Variables

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [imageIsOpen, setImageIsOpen] = useState(0)
    const images = [
        'https://source.unsplash.com/random/featured/?nature',
        'https://source.unsplash.com/random/featured/?nature, water',
        'https://source.unsplash.com/random/featured/?nature, forest',
        'https://source.unsplash.com/random/featured/?nature, mountain',
        'https://source.unsplash.com/random/featured/?nature, laker',
        'https://source.unsplash.com/random/featured/?nature, beach'
      ]
    const titles = [
          'Restaurant 12/03/10',
          'Restaurant 12/05/10',
          'Hotel 12/03/10',
          'Essence 12/03/10',
          'Imprimante 12/03/10',
          'Restaurant 14/03/10'
        ]

// --------------- Components ImageOptions (normalement dans un folder components)

function ImageOptions() {
        var div = document.getElementById('imgModal');
        var active = false;
        var currentX = 0;
        var currentY = 0;
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
          // marquer les différents transform en une seule fois permet de ne pas annuler les précédents
        }

        function zoomIn() {
          scale = 2*scale;
          rotation = rotation - 1; // décrémente rotate pour ne pas tourner
          rotate(currentX, currentY)
        }

        function zoomOut() {
          scale = Math.round(scale/2); //Maths round permet de ne pas dezoom en scale = 1
          rotation = rotation - 1;
          rotate(currentX, currentY)
        }

        function optionKey(event) {
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
          if (active) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            var etatRotation = rotation % 4;
            console.log(etatRotation)

            // ces if permettent de gérer les coordonées en cas de rotation
            if (etatRotation === 1) {
              let transition = currentX;
              currentX = +currentY;
              currentY = -transition;

            } else if (etatRotation === 2) {
              currentY = -currentY
              currentX = -currentX

            } else if (etatRotation === 3) {
              let transition = currentY;
              currentY = +currentX;
              currentX = -transition;
            }
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
            <div className="buttonBox" onKeyDown={(event) => optionKey(event)}>
              <button className="button" onClick={() => zoomOut()}><i className="material-icons">&#xe900;</i></button>
              <button className="button" onClick={() => zoomIn()}><i className="material-icons">&#xe8ff;</i></button>
              <button className="button" onClick={() => rotate(0, 0)}><i className="material-icons">&#xe84d;</i></button>
              <h4 className="title">{titles[imageIsOpen]}</h4>
            </div>
          </React.Fragment>
        )
}

// --------------- Fin Components





// --------------- Fonctions pour le Modal

    function handleOpen(image) {
      setModalIsOpen(true)
      setImageIsOpen(imageIsOpen => images.indexOf(image))
    }

    function handleClose() {
      setModalIsOpen(false)
    }


  return (
    <div >
      {images.map((image, k) => <img key={k} className="imgGalery" onClick={() => handleOpen(image)} src={image}></img>)}
      <Modal className="modal" open={modalIsOpen} onClose={() => handleClose()}>
          <ImageOptions />
      </Modal>
    </div>
  )
}

export default App;
