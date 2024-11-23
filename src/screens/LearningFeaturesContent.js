import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import { Video } from "expo-av";

const LearningFeatureContent = ({ route }) => {
  const { item } = route.params;
  const videoRef = useRef(null); // Reference for the Video component
  const [status, setStatus] = useState({}); // State to track video playback status

  console.log(item);

  const handlePlayPause = () => {
    if (status.isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.titleHeader}>Content</Text>
        </View>
        <View style={styles.containerImage}>
          <Image
            source={{
              uri: `${"https://smart-spend.online"}/storage/${item.image}`,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        {item.video && (
          <View style={styles.containerImage}>
            <Video
              ref={videoRef}
              style={styles.video}
              source={{
                uri: `${"https://smart-spend.online"}/storage/${item.video}`,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping={false}
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
            <View style={styles.controls}>
              <Button
                title={status.isPlaying ? "Pause" : "Play"}
                onPress={handlePlayPause}
              />
              <Text style={styles.time}>
                {Math.floor(status.positionMillis / 1000) || 0} /{" "}
                {Math.floor(status.durationMillis / 1000) || 0} sec
              </Text>
            </View>
          </View>
        )}
        <View style={styles.containerContent}>
          <View style={styles.contents}>
            <Text style={styles.label}>Topic:</Text>
            <Text style={styles.content} numberOfLines={1000}>
              {item.title}
            </Text>
          </View>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.contents}>
            <Text style={styles.label}>Description:</Text>
            <Text
              style={[styles.content, styles.description]}
              numberOfLines={1000}
            >
              {item.description}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LearningFeatureContent;

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  containerHeader: {
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerImage: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 500,
  },
  containerContent: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  titleHeader: {
    fontWeight: "bold",
  },
  image: { width: "100%", height: 300, borderRadius: 20 },
  contents: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  description: {
    flexShrink: 1,
  },
  video: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
  controls: {
    marginTop: 10,
    alignItems: "center",
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    color: "#555",
  },
});
