import React, {Component} from 'react';
import  { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem,Button, 
    Modal, ModalHeader, ModalBody, FormGroup, Label} from 'reactstrap';
import { Link } from 'react-router-dom'
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
    

    

const required =  (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

    
    


    

      

        
const DishDetail = (props) => {
    if(props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMess) {
        return(
            <div className="container">
            <div className="row">
                <h4>{props.errMess}</h4>
            </div>
        </div>
        );
    }
    else if(props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">   
                    <div className="col-12 col-md-5 m-1">  
                        <RenderDish  dish={props.dish}/>
                    </div> 
                        <RenderComments comments={props.comments}
                            addComment={props.addComment} 
                            dishId={props.dish.id}/>    

                                            
                    
                </div>
            </div>
        );
    }
    else
        return(
            <div></div>
        );
}

   

/**
 * 
 * @param {object} dish 
 */
function RenderDish({dish}) {
    if(dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={baseUrl +  dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    } else {
        return (
            <div></div>
        )
    }
}
    


class CommentForm extends Component {
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
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

    }

    render() {
        return(
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
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" 
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                    
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" 
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
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
            )
    }
}

/**
 * 
 * @param {object} dish 
 */
function RenderComments({comments, addComment, dishId}) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    if(comments != null) { 
            return (
                <div className="col-12 col-md-5 m-1">  
                    <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {comments.map((comment)=>{
                                return(
                                <li key={comment.id} className="media">
                                    <div className="media-body">
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author}, {new Date(comment.date).toLocaleDateString('en-US', options)}</p>
                                    </div>
                                </li>
                                )
                            })}
                            
                        </ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            );
        

        

       
    } else {
        return (
            <div></div>
        );
    }
}
    
    
 
 export default DishDetail; 