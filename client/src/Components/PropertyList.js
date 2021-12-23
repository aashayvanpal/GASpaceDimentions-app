import React from 'react'
import axios from 'axios'
import logoutLogo from '../images/logout-logo.png'
import deleteIcon from '../images/delete-icon.png'

export default class PropertyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            area: '',
            location: '',
            name: '',
            phoneno: '',
            bhk: '',
            waterType: '',
            rent: '',
            deposit: '',
            parking: '',
            vastu: '',
            maintenanceCharges: '',
            notes: '',
            properties: [],
        }
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        this.setState({ [name]: value })
    }

    displayProperty(properties) {

        if (!properties.length) return null

        return <table style={{ width: "100%", textAlign: "center", borderCollapse: "collapse" }}>
            <thead>
                <td>SLno</td>
                <td>location</td>
                <td>area</td>
                <td>bhk</td>
                <td>rent</td>
                <td>owner name</td>
                <td>phonenum</td>
                <td>watertype</td>
                <td>deposit</td>
                <td>parking</td>
                <td>vastu</td>
                <td>maintenanceCharges</td>
                <td>notes</td>
            </thead>
            {properties.map((property, index) => (
                <tr>
                    <td>{index + 1}</td>
                    <td>{property.location}</td>
                    <td>{property.area}</td>
                    <td>{property.bhk}</td>
                    <td>{property.rent}</td>
                    <td>{property.name}</td>
                    <td>{property.phoneno}</td>
                    <td>{property.waterType}</td>
                    <td>{property.deposit}</td>
                    <td>{property.parking}</td>
                    <td>{property.vastu}</td>
                    <td>{property.maintenanceCharges}</td>
                    <td>{property.notes}</td>

                    <button className="button-red" style={{ padding: "0px" }} onClick={() => { this.deleteProperty(property._id) }}>
                        <img src={deleteIcon} style={{
                            display: "inline-block",
                            verticalAlign: "middle",
                            width: "40px",
                        }} />
                    </button>
                </tr>
            ))}
        </table>
    }

    getPropertyData() {
        console.log('get this userid:', this.props.userid)
        axios.get(`/api/properties/${this.props.userid}`)
            .then((response) => {
                this.setState({
                    properties: response.data
                })
                console.log("data has been recieved for properties")
                console.log(response.data)

            })
            .catch(() => {
                // alert('could not get the property data!')
            })
    }
    deleteProperty(id) {
        console.log('clicked on delete id :', id)
        // delete method
        axios({
            url: `/api/deleteProperty/${id}`,
            method: 'DELETE'
        })
            .then(() => {
                console.log("delete initiated")
                this.getPropertyData()

            })
            .catch(() => {
                console.log("error in deleting the property")

            })

        this.setState({
            properties: this.state.properties.filter(property => property._id !== id)
        })
    }

    resetUserInputs = () => {
        this.setState({
            property: '',
        })
    }

    submitProperty = (event) => {
        event.preventDefault()
        console.log('checkc userid here', this.props.userid)
        if (this.state.location !== '') {
            const payload = {
                userid: this.props.userid,

                name: this.state.name,
                phoneno: this.state.phoneno,
                area: this.state.area,
                bhk: this.state.bhk,
                waterType: this.state.waterType,
                rent: this.state.rent,
                deposit: this.state.deposit,
                parking: this.state.parking,
                location: this.state.location,
                vastu: this.state.vastu,
                maintenanceCharges: this.state.maintenanceCharges,
                notes: this.state.notes,
            }

            axios({
                url: '/api/save/property',
                data: payload,
                method: 'POST'
            })
                .then(() => {
                    this.resetUserInputs()
                    this.getPropertyData()
                    console.log("property has been sent to the server")

                })
                .catch(() => {
                    console.log("error in sending the property data")

                })
        }
        else {
            alert('you cannot enter a blank location')
        }

    }

    logout = () => {
        axios({
            url: '/api/logout',
            method: 'GET'
        })
            .then(() => {
                console.log("logging out")
                window.location.href = '/'

            })
            .catch(() => {
                console.log("error in sending the property data")

            })
        console.log("front end logout")

    }

    componentDidMount() {
        this.getPropertyData()
    }
    render() {
        return (
            < div >
                <div style={{ backgroundColor: "#dcdcdc", display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <h2>Space Dimentions</h2>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <h2>{this.props.username}</h2>
                        <img src={this.props.profilePic} style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                        }} />
                        {/* <a href='http://localhost:5001/logout'></a> */}
                        <button className="button-black" onClick={this.logout}><img src={logoutLogo} style={{
                            display: "inline-block",
                            verticalAlign: "middle", marginRight: "10px", width: "35px", height: "30px"
                        }} />
                            Logout
                        </button>
                    </div>

                </div>


                <div style={{
                    display: "flex", width: "100%", flexDirection: "column",

                }}>
                    <div style={{ display: "flex" }}>
                        {/* <div style={{
                            width: "300px", backgroundColor: "yellow",
                        }}>
                            Project List
                            <ul>
                                <li>Project</li>
                                <li>Item1</li>
                                <li>Item1</li>
                                <li>Item1</li>
                                <li>Item1</li>
                            </ul>
                        </div> */}
                        <div
                            style={{ width: "100%" }}
                        >
                            <h1>New rental Property</h1>
                            <form onSubmit={this.submitProperty}>
                                
                                <div className="form-input">

                                    <input
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        placeholder="Owner name"
                                        onChange={this.handleChange}
                                    />
                                    <input
                                        type="text"
                                        name="phoneno"
                                        value={this.state.phoneno}
                                        placeholder="Add your phoneno"
                                        onChange={this.handleChange}
                                    /><input
                                        type="text"
                                        name="area"
                                        value={this.state.area}
                                        placeholder="Add your carpet area"
                                        onChange={this.handleChange}
                                    /><input
                                        type="text"
                                        name="bhk"
                                        value={this.state.bhk}
                                        placeholder="Add your bhk"
                                        onChange={this.handleChange}
                                    /><input
                                        type="text"
                                        name="waterType"
                                        value={this.state.waterType}
                                        placeholder="Add your waterType"
                                        onChange={this.handleChange}
                                    /><input
                                        type="text"
                                        name="rent"
                                        value={this.state.rent}
                                        placeholder="Add your rent"
                                        onChange={this.handleChange}
                                    /><input
                                        type="text"
                                        name="deposit"
                                        value={this.state.deposit}
                                        placeholder="Add your deposit"
                                        onChange={this.handleChange}
                                    /><input
                                        type="text"
                                        name="parking"
                                        value={this.state.parking}
                                        placeholder="Add your parking"
                                        onChange={this.handleChange}
                                    /><input
                                        type="text"
                                        name="location"
                                        value={this.state.location}
                                        placeholder="Add your location"
                                        onChange={this.handleChange}
                                    /><input
                                        type="text"
                                        name="vastu"
                                        value={this.state.vastu}
                                        placeholder="Add your vastu"
                                        onChange={this.handleChange}
                                    /><input
                                        type="text"
                                        name="maintenanceCharges"
                                        value={this.state.maintenanceCharges}
                                        placeholder="Add your maintenanceCharges"
                                        onChange={this.handleChange}
                                    /><input
                                        type="text"
                                        name="notes"
                                        value={this.state.notes}
                                        placeholder="Add your notes"
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <button>Add</button>
                            </form>

                            <div className="blog-post">
                                <h3>Total properties - {this.state.properties.length}</h3>
                                {this.displayProperty(this.state.properties)}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}