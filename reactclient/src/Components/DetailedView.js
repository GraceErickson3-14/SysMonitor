import React, { Component } from 'react';
import axios from 'axios';

class DetailedView extends Component {
    state = {
        machineData: {},
    };

    async componentDidMount() {
        try {
            //const response = await axios.get(`http://localhost:5105/api/metrics/${this.props.match.params.id}`);
            //this.setState({ machineData: response.data });

        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Detailed View for Machine {this.props.match.params.id}</h1>
                </header>
                <section>
                    <h2>CPU Utilization</h2>
                    <p>User: {this.state.machineData.cpu.utilization.user}%</p>
                    <p>System: {this.state.machineData.cpu.utilization.system}%</p>
                    <p>Idle: {this.state.machineData.cpu.utilization.idle}%</p>
                </section>
                <section>
                    <h2>Memory Usage</h2>
                    <p>Used: {this.state.machineData.memory.usage.gigabytesUsed}GB</p>
                    <p>Available: {this.state.machineData.memory.usage.availableMemory}GB</p>
                </section>
                <section>
                    <h2>Disk Utilization</h2>
                    <p>Used: {this.state.machineData.disk.utilization.used}%</p>
                    <p>Available: {this.state.machineData.disk.utilization.available}%</p>
                    <p>Number of Operations: {this.state.machineData.disk.numberOfOperations}</p>
                    <p>Latency: {this.state.machineData.disk.latency}s</p>
                </section>
            </div>
        );
    }
}

export default DetailedView;
