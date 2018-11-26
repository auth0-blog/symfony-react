import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Card, CardText, CardBody,CardTitle, Container,Row, Col, Badge  } from 'reactstrap';
import axios from 'axios';
import auth0Client from '../utils/Auth';

class FetchResourcePrivate extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          privateResources: null,
          isLoading: null
        };
        this.fetchPrivateResources = this.fetchPrivateResources.bind(this);
    }
    
    componentWillMount() {
        this.fetchPrivateResources();
    }
    
    
    fetchPrivateResources () {
        if (!this.state.privateResources) {
            this.setState({ isLoading: true});
            axios.get('http://localhost:8000/api/private', {
                    headers: {'authorization': `Bearer ${auth0Client.getAccessToken()}`}
                }
            ).then(res => { this.setState({privateResources: res.data, isLoading: false}); })
        }
    }
    
    viewPublicResources() {
        this.props.history.push('/');
    }
    
    render() {
        return (
    
            <Container style={{marginTop:50}}>
    
                <h4 className={'text-center'}> Can only be viewed by Authenticated Users  </h4>
    
                {this.state.isLoading &&
                <span> Loading... </span>
                }
    
                {this.state.privateResources &&
                <Row style={{marginTop:40}}>
                    {this.state.privateResources.map(data =>
                        <Col xs="4" id={data.id} key={data.id}>
                            <Card>
                                <CardBody>
                                    <CardTitle>{data.title}</CardTitle>
                                    <span> Album ID:  <Badge color="info" pill>{data.albumId}</Badge></span>
                                    <CardText>{data.description}</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                </Row>
                }
                <div className={'row text-center'} style={{marginTop:40}}>
                    <button
                        className={"btn btn-success text-center"}
                        onClick={() => {this.viewPublicResources()}}
                    >
                        Click here to view the public resources
                    </button>
                </div>
            </Container>
        )
    }
}
    
export default withRouter(FetchResourcePrivate);