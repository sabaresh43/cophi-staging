import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddWelfare.css";
import add_icon from "../Assets/add.png";
import { getCatalogs } from "../../api/userService";

export const AddWelfare = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [welfareTitle, setWelfareTitle] = useState("");
  const [welfareDescription, setWelfareDescription] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [welfareList, setWelfareList] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);



  const getcatalogsss = async () => {
   
    try {
  
      const data = await getCatalogs();
      // setToken(data.token);
      console.log("catalogs:", data);
    } catch (error) {
      // setError(error.response ? error.response.data.message : error.message);
    } finally {
      
    // Navigate to the add welfare details page
  };
  // setLoading(false);
  }
  // Navigate to the add welfare details page
  getcatalogsss()

  const handleAddClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleTitleChange = (e) => {
    setWelfareTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setWelfareDescription(e.target.value);
  };

  const handleOrganizationNameChange = (e) => {
    setOrganizationName(e.target.value);
  };

  const handleSubmit = () => {
    if (welfareTitle && welfareDescription && organizationName) {
      setWelfareList([
        ...welfareList,
        {
          title: welfareTitle,
          description: welfareDescription,
          organization: organizationName,
          showMore: false,
        },
      ]);
      setWelfareTitle("");
      setWelfareDescription("");
      setOrganizationName("");
      setShowPopup(false);
    }
  };

  const toggleShowMore = (index) => {
    const updatedList = welfareList.map((item, idx) =>
      idx === index ? { ...item, showMore: !item.showMore } : item
    );
    setWelfareList(updatedList);
  };

  const handleTransactionClick = () => {
    navigate("/transactions");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Add Welfare</div>
        <div className="underline"></div>
      </div>

      <div className="add-icon-container" onClick={handleAddClick}>
        <img src={add_icon} alt="add icon" className="add-icon" />
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="header">
              <div className="text">Add Welfare Details</div>
              <div className="underline"></div>
            </div>
            <input
              type="text"
              placeholder="Welfare Title"
              value={welfareTitle}
              onChange={handleTitleChange}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Organization Name"
              value={organizationName}
              onChange={handleOrganizationNameChange}
              className="input-field"
            />
            <textarea
              placeholder="Welfare Description"
              value={welfareDescription}
              onChange={handleDescriptionChange}
              className="input-field"
            />
            <div className="popup-buttons">
              <button onClick={handleSubmit}>OK</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="welfare-list">
        {welfareList.map((welfare, index) => (
          <div key={index} className="welfare-item">
            <h4>{welfare.title}</h4>
            {welfare.showMore && (
              <>
                <p>
                  <strong>Organization:</strong> {welfare.organization}
                </p>
                <p>{welfare.description}</p>
              </>
            )}
            <button
              className="show-more-btn"
              onClick={() => toggleShowMore(index)}
            >
              {welfare.showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        ))}
      </div>

      <div className="transaction-button-container">
        <button className="transaction-button" onClick={handleTransactionClick}>
          Transactions
        </button>
      </div>
    </div>
  );
};
