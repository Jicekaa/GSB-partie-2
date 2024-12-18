import React, { useState } from 'react';
//props à un composant
function ErreurLogin({visible}) {
  return visible ? (
    //pas mon style tailwindcss
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Erreur d'authentification</strong>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3"/>
    </div>
  ): null ;
}

export default ErreurLogin;
