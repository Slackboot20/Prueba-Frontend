import React, { useState } from 'react'
import Modal from 'react-modal';
import './MenuItemModal.css';

Modal.setAppElement('#root');

export default function MenuItemModal({ isOpen, onRequestClose, item, onPurchase, isPurchased}) {
    if (!item) return null;

    const handlePurchaseClick = () => {
        if (!isPurchased) {
            onPurchase(item);
        }
      };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Vista Rapida" className="modal" overlayClassName="overlay">
        <div className="modal-content">
            <img src={item.image} alt={item.image} className="modal-image" />
            <div className="modal-details">
                <h3 className="modal-name">{item.name}</h3>
                <p className='modal-description'>{item.description}</p>
                <p className="modal-price">{item.price}</p>
            </div>
            <div className="modal-buttons">
                <button onClick={onRequestClose} className="close-button">Cerrar</button>
                <button onClick={handlePurchaseClick} className="purchase-button">
                    {isPurchased ? 'Comprado' : 'Comprar'}
                </button>
            </div>
        </div>
    </Modal>
  );
}
