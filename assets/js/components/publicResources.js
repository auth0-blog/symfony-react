import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Card, CardText, CardBody,CardTitle, Container,Row, Col, Badge  } from 'reactstrap';
import axios from 'axios';
    
class FetchResourcePublic extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            publicResources: null,
        };
        this.fetchPublicResources = this.fetchPublicResources.bind(this);
    }
    
    componentWillMount() {
        this.fetchPublicResources();
    }
    
    fetchPublicResources() {
        if (!this.state.publicResources) {
            axios.get('http://localhost:8000/api/public').then(res => {
                    this.setState({publicResources: res.data});
                })
        }
    }
    
    
    viewPrivateResources = () => {
        this.props.history.push('/private');
    }
    
    render() {
        return (
            <Container style={{marginTop:50}}>
                <h4 className={'text-center'}> This is a public page. You don't need to be authenticated  </h4>
                {this.state.publicResources &&
                    <Row style={{marginTop:40}}>
                        {this.state.publicResources.map(data =>
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
                        onClick={() => {this.viewPrivateResources()}}
                    >
                       Click here to log in and access private resources
                    </button>
                </div>
            </Container>
        )
    }
}
export default withRouter(FetchResourcePublic);