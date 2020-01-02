import React from 'react';



const FaceRecognition =({img}) =>{
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img alt="" src={img} width="500px" height="auto"/>
            </div>
        </div>
    );
}


export default FaceRecognition;




