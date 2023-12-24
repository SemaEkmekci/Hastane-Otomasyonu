import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PageLoadGif from './pageLoadGif';
import axios from 'axios';

const Pharmacy = ({ modalState, toggleModal }) => {
  const [pharmacyData, setPharmacyData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    let timeout;
    
    if (modalState) {
      setShowLoading(true);

      timeout = setTimeout(() => {
        async function getPharmacy() {
          try {
            const response = await axios.get(`http://localhost/hastane_backend/pharmacy.php`);
            setPharmacyData(response.data);
          } catch (error) {
            console.error('Eczane bilgilerini alma hatası:', error);
          } finally {
            setShowLoading(false);
          }
        }
        getPharmacy();
      }, 1000);
    }

    return () => {
      clearTimeout(timeout); // Clear timeout if component unmounts or modal closes
    };
  }, [modalState]);

  const handleShowMap = (address) => {
    const formattedAddress = address.replace(/\([^()]*\)/g, '').trim();
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Modal
      size="lg"
      isOpen={modalState}
      toggle={toggleModal}
    >
      <ModalHeader toggle={toggleModal}>
        Nöbetçi Eczane Bilgileri
      </ModalHeader>
      <ModalBody>
        {showLoading ? (
          <PageLoadGif /> // Display loading gif for 3 seconds
        ) : (
          Array.isArray(pharmacyData) && pharmacyData.length > 0 ? (
            <div>
              {pharmacyData.slice(1).map((pharmacy, index) => (
                <div key={index}>
                  <h4>{pharmacy.ad === "Eczane" ? "İLÇELER":  pharmacy.ad}
                 </h4>
                 {pharmacy.ad !== "Eczane" && (
                     <>
                       <p><strong>Adres:</strong> {pharmacy.adres}</p>
                       <p><strong>Telefon:</strong> {pharmacy.telefon}</p>
                       <button
                          className="button-form cancel-button"
                          onClick={() => handleShowMap(pharmacy.adres)}
                        >
                          Haritada Göster
                        </button>
                    </>
                  )}
                  
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <div>Bilgi bulunamadı.</div>
          )
        )}
      </ModalBody>
    </Modal>
  );
};

export default Pharmacy;
