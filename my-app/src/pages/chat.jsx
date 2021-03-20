import { ApolloClient,
     InMemoryCache,
      ApolloProvider,
       useQuery,
        gql,
        useMutation
     } from '@apollo/client';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Button, Grid, TextField} from '@material-ui/core';
import { textSpanContainsTextSpan } from 'typescript';



const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache() 
});

const GET_MESSAGES = gql`
query {
    messages {
      id
      content
      user
    }
  }
  `;

const POST_MESSAGES = gql`
mutation ($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
}
`;

const Messages = ({ user }) =>{
const {data}= useQuery(GET_MESSAGES, {
    pollInterval: 500,
});
if(!data) {return null; }
return (
   data.messages.map(({id, user: messageUsers, content}) => (
       <div
        style={{
            display: "flex",
            justifyContent: user === messageUsers ? "flex-end" : "flex-start",
            paddingBottom: "20px",
        }}
       >
           {user !== messageUsers && (
               <div
                style={{
                    height: "50px",
                    widht: "50px",
                    marginRight: "10px",
                    borderRadius: "20px",
                    textAlign: "center",
                    fontSize: "20pt",
                    paddingTop: "5px"
                }}
               >
                   {messageUsers.slice(0,2).toUpperCase()}
               </div>
           )}
           <div
           style={{
               background: user ===messageUsers ? "#4caf50" : "#e0e0e0",
               color: user === messageUsers ? "white" : "black",
               padding: "10px",
               borderRadius: "15px",
               maxWidth: "60%"
           }}
           >
            {content}
           </div>
       </div>
   ))
);
}


const Chat = () =>{
    const [state, setState] = React.useState({
        user: 'Jack',
        content: '',
    })
    const [postMessage] = useMutation(POST_MESSAGES);
    const onSend = () =>{
        if (state.content.length > 0) {
            postMessage({
                variables: state,
            })
        }
        setState({
            ...state,
            content: '',
        })
    }
    

    return (
        <div>
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Messages user={state.user}/>
                <Grid container >
                <Grid item xs={2}  style={{padding: "10px"}}>
                <TextField
                    variant="outlined"
                     label="User"
                     value={state.user}
                     onChange={(evt)=> setState({
                         ...state,
                         user: evt.target.value,
                     })}
                    />
                </Grid>
                <Grid item xs={8}  style={{padding: "10px"}}>
                <TextField
                    fullWidth
                    variant="outlined"
                     label="Content"
                     value={state.content}
                     onChange={(evt)=> setState({
                         ...state,
                         content: evt.target.value,
                     })}
                     onKeyUp={(evt)=>{
                         if(evt.keyCode === 13){
                             onSend();
                         }
                     }}
                    />
                </Grid>
               <Grid item xs={2} style={{padding: "20px"}}>
                   <Button
                    onClick={()=>onSend()}
                    color="primary"
                    variant="contained"
                   >
                       Send
                   </Button>
               </Grid>
            </Grid>
            </Container>
            </React.Fragment>    
        </div>
    );
}

export default () => (
    <ApolloProvider client={client}>
        <Chat/>
    </ApolloProvider>
); 