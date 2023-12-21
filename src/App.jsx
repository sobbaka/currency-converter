import { useState, useEffect } from 'react'

function App() {

  const [amount, setAmount] = useState(0)
  const [currencyFrom, setCurrencyFrom] = useState('currency')
  const [currencyTo, setCurrencyTo] = useState('currency')
  const [result, setResult] = useState(null)
  const [allCurrency, setAllCurrency] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(
    function () {
      async function fetchCurrency() {
        try {
          const response = await fetch(`https://api.frankfurter.app/currencies`)
          if (!response.ok) throw new Error('something is broken')
          const data = await response.json()
          setAllCurrency(data)
        }
        catch (err) {
          console.log(err)
        }
      }
      fetchCurrency()
    },
    [])

  function handleClick(e) {
    e.preventDefault()
    console.log(`https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`)
    async function fetchExchangeRating() {
      try {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`)
        if (!response.ok) throw new Error('something is broken')
        const data = await response.json()
        setIsOpen(true)
        setResult(data.rates[currencyTo])
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchExchangeRating()
  }

  function handleClose(e) {
    setIsOpen(false)
    setTimeout(() => {
      setResult(null);
    }, 1000);
  }

  return (
    <>
      <form className={'border rounded shadow d-flex flex-column align-items-center bg-white p-2'}>
        <h1 className={'text-center p-3'}>Currency converter</h1>

        <div className="input-group mb-3 custom-div">
          <span className="input-group-text custom-label" id="basic-addon1">Amount</span>
          <input type="number" className="form-control text-center" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className="input-group mb-3 custom-div">
          <label className="input-group-text custom-label" htmlFor='currency-from'>From</label>
          <select
            className="form-control custom-select"
            id='currency-from'
            value={currencyFrom}
            onChange={(e) => setCurrencyFrom(e.target.value)}
          >
            <option value="currency" disabled hidden>currency</option>
            {allCurrency && Object.keys(allCurrency).map((currency, index) => <option key={index} value={currency}>{allCurrency[currency]}</option>)}
          </select>
        </div>
        <div className="input-group mb-3 custom-div">
          <label className="input-group-text custom-label pe-auto" htmlFor='currency-to'>To</label>
          <select
            className="form-control custom-select"
            id='currency-to'
            value={currencyTo}
            onChange={(e) => setCurrencyTo(e.target.value)}
          >
            <option value="currency" disabled hidden>currency</option>
            {allCurrency && Object.keys(allCurrency).map((currency, index) => <option key={index} value={currency}>{allCurrency[currency]}</option>)}
          </select>
        </div>
        <div className={'text-center pt-3 pb-4'}><button className={'btn btn-primary fw-bold'} onClick={handleClick}>Convert</button></div>
      </form>

      {result &&
        <div className={`border rounded shadow mt-2 custom-result bg-white animate__animated ${isOpen ? 'animate__flipInX' : 'animate__flipOutX'}`}>
          <div className={'text-end pt-4 px-4'}><button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button></div>
          <h2 className={'text-center pt-2 pb-4'}>{parseFloat(result).toFixed(2)} {allCurrency[currencyTo]}</h2>
        </div>
      }


    </>
  )
}

export default App
