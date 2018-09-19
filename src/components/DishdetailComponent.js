import React from 'react';
import  { Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'

    /**
     * 
     * @param {object} dish 
     */
    function RenderDish({dish}) {
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
    function RenderComments({comments}) {
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
    
    
    const DishDetail = (props) =>  {
        
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
                    <div className="col-12 col-md-5 m-1">  
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );
    }
    
 
 export default DishDetail; 