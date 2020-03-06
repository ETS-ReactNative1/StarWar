import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Item from './item';
import {Container, Icon} from './../../components';

const query = gql`
  query {
    allFilms {
      edges {
        node {
          id
          title
          episodeID
          releaseDate
        }
      }
    }
  }
`;

class ListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: null,
      searching: false,
      searchName: '',
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      startSearch: this.startSearch,
      startFilter: this.startFilter,
    });
  }

  onSelect = movie => {
    console.log('movie: ', movie);
    this.props.navigation.navigate('Detail', {
      id: movie.id,
      name: movie.title,
    });
  };

  startSearch = () => {
    // trigger when search icon press in toolbar
    if (this.state.searching) {
      // clear search content
      this.setState({searchName: ''});
    }
    // toggle search box
    this.setState({searching: !this.state.searching});
  };

  startFilter = () => {
    // trigger when filter icon press in toolbar
  };

  render() {
    return (
      <Container style={styles.wrapper}>
        {this.renderSearchBox()}
        <Query query={query}>
          {({loading, error, data}) => {
            if (loading) {
              return <ActivityIndicator />;
            }
            if (error) {
              return <Text>An error ocurred</Text>;
            }
            if (data && data.allFilms) {
              return (
                <View style={styles.listWrapper}>
                  <Text style={styles.title}>Start War</Text>
                  <FlatList
                    style={styles.listWrapper}
                    data={data.allFilms.edges}
                    keyExtractor={item => item.node.id.toString()}
                    renderItem={({item}) => {
                      if (item.node.title.includes(this.state.searchName)) {
                        return (
                          <View style={styles.itemWrapper}>
                            <Item
                              movie={item.node}
                              onSelect={() => this.onSelect(item.node)}
                            />
                          </View>
                        );
                      } else {
                        return null;
                      }
                    }}
                  />
                </View>
              );
            }
          }}
        </Query>
      </Container>
    );
  }

  renderSearchBox = () => {
    if (this.state.searching) {
      return (
        <View style={styles.searchBoxWrapper}>
          <TextInput
            style={styles.searchBox}
            onChangeText={text => this.setState({searchName: text})}
            value={this.state.searchName}
            placeholder="Enter part of movie name"
          />
        </View>
      );
    }
  };

  static navigationOptions = ({navigation, route}) => ({
    title: '',
    headerRight: () => (
      <TouchableOpacity
        onPress={() => route.params.startFilter && route.params.startFilter()}
        style={styles.headerIcon}>
        <Icon name="filter" />
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => route.params.startSearch && route.params.startSearch()}
        style={styles.headerIcon}>
        <Icon name="search" />
      </TouchableOpacity>
    ),
  });
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemWrapper: {
    padding: 10,
  },
  headerIcon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchBoxWrapper: {
    padding: 10,
  },
  searchBox: {
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    height: 45,
    fontSize: 18,
  },
});

export default ListScreen;