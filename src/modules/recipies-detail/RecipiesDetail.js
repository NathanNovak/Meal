import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ActivityIndicator, Button, Card, Checkbox, Paragraph} from 'react-native-paper';
import useServerHook from '../services/useServerHook';
import {DummyJSONRecipe} from '../recipe.constants';

const RecipesDetail = (props) => {
  console.log('RD props', props);

  const [recipeDetails, setRecipeDetails] = useState({});

  const useServer = useServerHook();

  useEffect(() => {
    const getRecipeDetails = async () => {
      console.log('RECIPE DETAILS RES', props.route.params.recipeDetailsObj);
      setRecipeDetails(DummyJSONRecipe);
    };

    getRecipeDetails();
  }, []);

  return (
    <React.Fragment>
      <View style={{flex: 0, alignItems: 'center'}}>
        <Text>Details Screen</Text>
        <Button
          onPress={() => props.navigation.goBack()}
          mode={'contained'}
        >
          Go Back
        </Button>
        <View style={{}}>
          <Card style={{fkex: 1}}>
            <Card.Content style={{borderWidth: 1, backgroundColor: 'lightgrey'}}>
              <Card.Title
                titleStyle={{textAlign: 'center', fontSize: 14, flexWrap: 'wrap'}}
                title={recipeDetails.title}/>
              <Card.Cover style={{}} source={{uri: recipeDetails.image}}/>
              <View style={{}}>
                <Text>Ready in: {recipeDetails.readyInMinutes} minutes</Text>
                <Text>Servings: {recipeDetails.servings}</Text>
              </View>
              <ScrollView style={{height: 300, flex: 0}}>
                <Paragraph>{recipeDetails.summary}</Paragraph>
              </ScrollView>
            </Card.Content>
          </Card>
        </View>
      </View>
    </React.Fragment>
  );
};

export default RecipesDetail;
