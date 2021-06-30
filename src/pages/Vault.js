const Vault = (props) => {
    
    const city = props.match.params.city
    const state = props.match.params.state

    
    return (
        <>
            <h1>{city}</h1>
            <h1>{state}</h1>
        </>
    )

}

export default Vault