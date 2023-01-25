
import React, { Component } from 'react';
import Slider from 'react-slick';
import './Carousel.css';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BarChart from './BarChart';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';


import DetailedView from './DetailedView';



class Carousel extends Component {
    state = {
        machines: [],
        machineData: [],

    };

    
   

    fetchMachineId = async () => {
        let machines = [];
        try {
            const response = await axios.get(`http://localhost:5105/api/metrics`);
         
            machines = machines.concat(response.data);
            
            this.setState({ machines }, () => {
                if (this.state.machines.length > 0) {
                    this.fetchMachineData();
                }
            });
            
        } catch (error) {
            console.error(error);
        }
    }

    

    async componentDidMount() {
    
        try {
            await this.fetchMachineId();
            if (this.state.machines.length > 0) {
                this.fetchMachineData();
            }
        } catch (error) {
            console.log(error);
        }
    }

  
    fetchMachineData = async () => {
        let machineData = [];

        try {
            for (let i = 0; i < this.state.machines.length; i++) {
                
                const response = await axios.get(`http://localhost:5105/api/metrics/${this.state.machines[i]}`);
                machineData[i] = [response.data.cpu.utilization.user, response.data.cpu.utilization.system, response.data.cpu.utilization.idle];
                
            }
            
            this.setState({ machineData });
  

        } catch (error) {
            console.error(error);
        }
    }


    handleClick = (machine) => {
        //let history = useHistory();
        // redirect logic, for example using the `history` object from react-router
       // this.props.history.push("/DetailedView");
        
    }


    render() {
       
        const settings = {
           
            dots: true,
            infinite: true,
            arrow: true,
            speed: 500,
            slidesToShow:3,
            slidesToScroll: 1
        };
     
        if (!this.state.machines || Object.keys(this.state.machines).length === 0 || !this.state.machineData || Object.keys(this.state.machineData).length === 0)
         {
            return null;
        }

        

        return (
            <div className="carousel-container">
                <Slider {...settings}>
                    {this.state.machines.map((machine,index) => (
       
                        <div key={index} className="slide">
                        
                            <button className="machine-button" onClick={() => this.handleClick(machine)}>
                                Machine: {machine}
                            </button>
      
                            <BarChart machineData={this.state.machineData[index]} />
                        </div>
                    ))}
                </Slider>
            </div>
        );
     }

}

export default Carousel;


