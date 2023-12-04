import React from "react";

import { NetworkErrorMessage } from "./NetworkErrorMessage";

export function MintMassToken({ mintMassToken, networkError, dismiss }) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {/* Wallet network should be set to Localhost:8545 or Sepolia. */}
          {networkError && (
            <NetworkErrorMessage 
              message={networkError} 
              dismiss={dismiss} 
            />
          )}
        </div>
        <div className="col-6 p-4 text-center">
          <p>Mint MASS Token.</p>
          <button
            className="btn btn-warning"
            type="button"
            onClick={mintMassToken}
          >
            Forge Asset
          </button>
        </div>
      </div>
    </div>
  );
}
