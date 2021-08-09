const Contact = () => {
    return (
        <>
            <p>Request a city</p>
            <form method="POST" action="https://formsubmit.co/drgsucceed@gmail.com" id="contact-form">
                <label className="form-label" htmlFor="formName">Email</label><br/>
                <input type="email" name="Email" required /><br/>
                <label className="form-label" htmlFor="formName">City</label><br/>
                <input type="text" name="City" required /><br/>
                <label className="form-label" htmlFor="formName">State / Country</label><br/>
                <input type="text" name="State/Country" required /><br/>
                <label className="form-label" htmlFor="formMessage">Message (Optional)</label><br/>
                <textarea type="text" name="Message" id="formMessage"></textarea><br/>
                <button type="submit">Send</button>
            </form>
        </>
    )
}

export default Contact