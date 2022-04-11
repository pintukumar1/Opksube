import Button from '../components/FormElements/Button'

const Landing = () => {
    return (
            <div className="page">
                <div className="info">
                    <h1>
                        Book <span>store</span> App
                    </h1>
                    <p>
                        I'm baby blue bottle whatever echo park cred street
                        art meditation plaid you probably haven't
                        heard of them iceland umami.
                        Kogi wayfarers yr tofu banh mi four dollar toast
                        tumeric chia vice air plant.
                    </p>
                    <Button to="/seller-auth" >Login/Register Seller</Button>
                    <Button to="/customer-auth" >Login/Register Customer</Button>
                </div>
            </div>  
    )
}


export default Landing
