import { useState } from 'react'

function App() {


  return (
    <>
      <form className={'border rounded shadow d-flex flex-column align-items-center bg-white'}>
        <h1 className={'text-center'}>Currency converter</h1>

        <div className="input-group mb-3 custom-div">
          <span className="input-group-text custom-label" id="basic-addon1">Amount</span>
          <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3 custom-div">
          <span className="input-group-text custom-label" id="basic-addon1">From</span>
          <select className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="input-group mb-3 custom-div">
          <span className="input-group-text custom-label" id="basic-addon1">To</span>
          <select className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className={'text-center'}><button className={'btn btn-primary'}>button</button></div>
      </form>

      <div className={'border rounded shadow mt-2 custom-result bg-white'}>

      </div>
    </>
  )
}

export default App
