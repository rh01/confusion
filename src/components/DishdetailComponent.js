import React, {Component} from 'react';
import  { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem,Button, 
    Modal, ModalHeader, ModalBody, FormGroup, Label} from 'reactstrap';
import { Link } from 'react-router-dom'
import {Control, LocalForm, Errors} from 'react-redux-form';

    

    

const required =  (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

    
    
class DishDetail  extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

      

        
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">   
                    <div className="col-12 col-md-5 m-1">  
                        <this.RenderDish  dish={this.props.dish}/>
                    </div> 
                    <div className="col-12 col-md-5 m-1">  
                        <this.RenderComments comments={this.props.comments} />
                        <div>
                        <React.Fragment>          
                            <Button outline  onClick={this.toggleModal}>
                                <span className="fa fa-edit" > Submit Comments</span>
                            </Button>

                          
                            
                            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>
                                    Submit Comment
                                </ModalHeader>
                                <ModalBody>
                                    <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                        <FormGroup>
                                            <Label htmlFor="rate">Rating</Label>
                                            <Control.select model=".rate" id="rate" name="rate" 
                                                className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                                
                                        </FormGroup>

                                        <FormGroup>
                                            <Label htmlFor="name">Your Name</Label>
                                            <Control.text model=".name" id="name" name="name" 
                                                placeholder="Your Name"
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".name"
                                                    show="touched"
                                                    messages={{
                                                        required : "Required",
                                                        maxLength: "must be greater than 2 characters",
                                                        minLength: "Must be 15 characters or less."
                                                    }}
                                                />
                                        </FormGroup>
                                
                                        <FormGroup>
                                            <Label htmlFor="comment">Comments</Label>
                                            <Control.textarea model=".comment" name="comment"
                                                rows="10" 
                                                className="form-control"></Control.textarea>
                                            
                                        </FormGroup>

                                        <FormGroup>
                                            <Button type="submit" value="submit"  color="primary">Submit</Button>
                                        </FormGroup>
                                    </LocalForm>
                                </ModalBody>
                            </Modal>
                            
                        </React.Fragment>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }

   

    /**
     * 
     * @param {object} dish 
     */
    RenderDish({dish}) {
        if(dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        } else {
            return (
                <div></div>
            );
        }
    }
    
    /**
     * 
     * @param {object} dish 
     */
    RenderComments({comments}) {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        if(comments != null) {
            const comments_processed = comments.map((comment) => {
                return (
              
                        <div key={comment.id}>
                            <ul className="list-unstyled">
                                <li className="media">
                                    <div className="media-body">
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author}, {new Date(comment.date).toLocaleDateString('en-US', options)}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                   
                );
            });

          

            return (
                <div>
                    <h4>Comments</h4>
                    {comments_processed}
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
    }
    
 
 export default DishDetail; 