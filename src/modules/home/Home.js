import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, TextInput, View} from 'react-native';
import {Appbar, Button, Searchbar, List, Card} from 'react-native-paper';

import useServerHook from '../services/useServerHook';

import {CUISINES} from '../recipe.constants';

const Home = (props) => {
  // console.log(props);
  const [selected, setSelected] = useState('key1');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [recipes, setRecipes] = useState([]);

  const useServer = useServerHook();

  useEffect(() => {
    console.log('RECIPES', recipes);
    console.log(props);

  }, [recipes]);

  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  const submit = async () => {
    const recipeResponse = await useServer.getComplexSearchQuery(searchQuery)
    setRecipes(recipeResponse);
  };

  const getRecipe = async (id) => {
    const recipeDetailRes = await useServer.getRecipeDetails(id);
    props.navigation.navigate('Recipe Detail', {recipeDetailsObj: recipeDetailRes});
  };

  // const onValueChange = (value) => {
  //   setSelected(value);
  // };

  const renderRecipeList = (item) => {
    return (
      <Card style={{flex: 1, padding: 5}} onPress={() => getRecipe(item.id)}>
        <Card.Title
          title={item.title}
          titleStyle={{textAlign: 'center', fontSize: 11}}
          // style={{width: '100%', backgroundColor: 'red'}}
        />
        <Card.Cover source={{uri: item.image}} style={{}}/>
      </Card>
    );
  };

  return (
      <View style={{padding: 0, flex: 1}}>
        {/*<Appbar>*/}
          <Appbar.Header style={{alignItems: 'center', justifyContent: 'flex-end'}}>
              {/*<Appbar.Content title="Title" subtitle="Subtitle" />*/}
              <Searchbar
                placeholder={'Search Meals'}
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{width: 300, height: 40}}
                icon={'blank'}
                // onIconPress={() => submit()}
              />
              <Button
                onPress={() => submit()}
                style={{justifyContent: 'center'}}
                icon={'magnify'}
                mode={'contained'}>
                Search Now!
              </Button>
          </Appbar.Header>

        {/*</Appbar>*/}

        <View style={{paddingTop: 10, flex: 1}}>
          <FlatList
            numColumns={2}
            data={recipes}
            renderItem={({item}) => renderRecipeList(item)}
          />
        </View>
      </View>
  );
};

export default Home;
