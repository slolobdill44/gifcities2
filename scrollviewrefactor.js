 <FlatList
            style={styles.list}
            data={this.state.data}
            ListHeaderComponent={this.renderListHeader}
            horizontal=true
            keyExtractor={(item, index) => item.checksum}
            renderItem={({item}) => {
              //console.log(item);
              return (
                <Image
                  source={{uri: this.gifUrl(item.gif)}}
                  resizeMode="cover"
                  id={item.id}
                  style={{
                    width: (item.width > 300) ? undefined : item.width,
                    height: item.height,
                    margin: 8
                  }}/>
              )
            }} />