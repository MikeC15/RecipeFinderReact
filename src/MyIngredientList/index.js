import React from 'react';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';

function MyIngredientList(props) {
    // console.log("PROPS.MISSION PASSED DOWN FROM PARENTPARENT", props.mission)
    // const comments = props.comments.filter(comment => comment.flight_number == props.mission.mission_id)
    //ONCE MISSION IS PASSED DOWN PUT comment.fliht number == currentmission flightnumber
    const ingredients = props.myIngredients.map((ingredient) => {
        return (
            <Segment key={ingredient._id}>
                <Header as='h5'>
                    {ingredient.name}
                    <Icon name="close" onClick={() => props.deleteMyIngredient(ingredient._id)} />
                    <Icon name="edit" onClick={() => props.openEditModal(ingredient)} />
                </Header>
            </Segment>
            // <Comment key={comment.id}>
            //     <Comment.Content>
            //         <Header as='h5' dividing>{comment.user.username}</Header>
            //         <Comment.Text>{comment.content}</Comment.Text>
            //         <Comment.Metadata>{comment.created_at}</Comment.Metadata><br />
            //     </Comment.Content>
            // </Comment>
        )
    })

    return (
        <React.Fragment>
            {ingredients}
        </React.Fragment>
        // <Comment.Group>
        //     {filteredComments}
        // </Comment.Group>
    )
}

export default MyIngredientList