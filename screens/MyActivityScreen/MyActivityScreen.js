import {
  Pressable,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../contexts/AuthContext";
import ActiveUserImage from "../../components/ActiveUserComponents/ActiveUserImage.js";
import { moderateScale } from "react-native-size-matters";
import { useEffect, useState } from "react";
import axios from "axios";
import { ip } from "../../ip/ip";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import ExpandableText from "../../components/UI/ExpandableText/ExpandableText.js";

const PAGE_SIZE = 10; // Her istekte getirilecek veri sayısı

export default function MyActivityScreen() {
  const {
    authState: { userId },
  } = useAuth();

  const [myActivity, setMyActivity] = useState([]);
  const [page, setPage] = useState(1); // Sayfa numarası
  const [loading, setLoading] = useState(false); // Yüklenme durumu
  const [hasMore, setHasMore] = useState(true); // Daha fazla veri var mı kontrolü

  useFocusEffect(
    React.useCallback(() => {
      setPage(1);
      setMyActivity([]);
      setHasMore(true);
      fetchMyActivity(1);
    }, [userId])
  );

  const fetchMyActivity = async (currentPage) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${ip}/post/user/${userId}?page=${currentPage}&limit=${PAGE_SIZE}`
      );
      const newData = response.data.data;

      if (newData.length < PAGE_SIZE) {
        setHasMore(false); // Daha fazla veri yoksa sonsuz kaydırmayı durdur
      }

      setMyActivity((prevData) => [...prevData, ...newData]); // Yeni verileri ekle
      setPage(currentPage + 1); // Sayfa numarasını artır
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }

    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR");
  };

  const renderItem = ({ item }) => {
    console.log(item); // `item` nesnesinin yapısını kontrol edin
    return (
      <Pressable style={styles.card}>
        <View style={styles.header}>
          <ActiveUserImage style={styles.userImage} />
          <View style={styles.headerText}>
            <Text style={styles.username}>{item.username}</Text>
          </View>
        </View>

        <View style={styles.descriptionHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{formatDate(item.created_at)}</Text>
        </View>

        <ExpandableText style={styles.description} text={item.description} />

        <View style={styles.imageContainer}>
          {Array.isArray(item.images) && item.images.length > 0 && (
            <View style={styles.imagesWrapper}>
              {item.images.length === 1 && (
                <Image
                  source={{
                    uri: `${ip}/static/${item.user_id}/${item.images[0]}`,
                  }}
                  style={styles.singleImage}
                />
              )}
              {item.images.length === 2 && (
                <View style={styles.twoImages}>
                  {item.images.map((image, idx) => (
                    <Image
                      key={idx}
                      source={{ uri: `${ip}/static/${item.user_id}/${image}` }}
                      style={styles.twoImage}
                    />
                  ))}
                </View>
              )}
              {item.images.length === 3 && (
                <View style={styles.threeImages}>
                  <Image
                    source={{
                      uri: `${ip}/static/${item.user_id}/${item.images[0]}`,
                    }}
                    style={styles.threeImageLeft}
                  />
                  <View style={styles.threeImageRight}>
                    {item.images.slice(1).map((image, idx) => (
                      <Image
                        key={idx}
                        source={{
                          uri: `${ip}/static/${item.user_id}/${image}`,
                        }}
                        style={styles.threeImage}
                      />
                    ))}
                  </View>
                </View>
              )}
              {item.images.length >= 4 && (
                <View style={styles.fourImages}>
                  {item.images.slice(0, 4).map((image, idx) => (
                    <Image
                      key={idx}
                      source={{ uri: `${ip}/static/${item.user_id}/${image}` }}
                      style={styles.fourImage}
                    />
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={myActivity}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={() => fetchMyActivity(page)}
        onEndReachedThreshold={0.5} // Listenin %50'sine gelindiğinde yükleme başlasın
        ListFooterComponent={() =>
          loading && <ActivityIndicator size="large" />
        }
        initialNumToRender={10} // İlk başta kaç öğe render edileceği
        maxToRenderPerBatch={10} // Her seferinde kaç öğe render edileceği
        windowSize={5} // FlatList, yalnızca ekranda görünen ve çevresindeki birkaç öğeyi bellekte tutar
        removeClippedSubviews={true} // Ekrandan çıkanları bellekten siler
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: moderateScale(12),
    marginVertical: moderateScale(8),
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(12),
  },
  userImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  headerText: {
    marginLeft: moderateScale(12),
    flex: 1,
  },
  username: {
    fontSize: moderateScale(14),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    color: "#222",
  },
  date: {
    fontSize: moderateScale(13),
    color: "#888",
    marginTop: moderateScale(3),
  },
  description: {
    fontSize: moderateScale(15),
    color: "#555",
    marginBottom: moderateScale(5),
    lineHeight: moderateScale(22),
  },
  imageContainer: {
    marginTop: 12,
  },
  singleImage: {
    width: "100%",
    height: moderateScale(220),
    borderRadius: moderateScale(10),
  },
  twoImages: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  twoImage: {
    width: "48%",
    height: moderateScale(220),
    borderRadius: moderateScale(10),
  },
  threeImages: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  threeImageLeft: {
    width: "48%",
    height: moderateScale(220),
    borderRadius: moderateScale(10),
  },
  threeImageRight: {
    width: "48%",
  },
  threeImage: {
    width: "100%",
    height: moderateScale(108),
    borderRadius: moderateScale(10),
  },
  fourImages: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fourImage: {
    width: "48%",
    height: moderateScale(108),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(4),
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(8),
  },
});
