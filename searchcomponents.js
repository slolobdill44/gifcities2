        { this.state.searchLoading ? 
          (<View style={styles.searchLoadingWrapper}>
             <Image
               style={styles.searchSpinner}
               source={require('./images/loading_images/loading3.gif')}/>
           </View>) : 
          (<ScrollView
             contentContainerStyle={styles.contentContainerStyle}
             keyboardDismissMode='on-drag'>
               {this.state.data.map((item, idx) => {
                 return (
                     <TouchableHighlight
                       key={idx}
                       onPress={() => this.saveToCameraRoll(item)}
                       underlayColor='transparent'>
                         <Image
                           source={{uri: this.gifUrl(item.gif)}}
                           style={{
                             width: item.width > 350 ? undefined : item.width,
                             height: item.height > 200 ? undefined : item.height,
                             margin: 7,
                             borderWidth: 10
                           }}
                         />
                     </TouchableHighlight>
                   )
               })}
           </ScrollView>) }