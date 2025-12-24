import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const AllItems = ({ data = [] }) => {
  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Items</Text>
        <Text style={styles.headingText}>Quantity</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          const isLowStock = item.stock < 20;

          return (
            <View
              style={[
                styles.itemContainer,
                { backgroundColor: isLowStock ? '#FFE5E5' : '#E8F5E9' },
              ]}
            >
              <Text style={styles.itemText}>{item.name}</Text>
              <Text
                style={[
                  styles.itemText,
                  { color: isLowStock ? '#D32F2F' : '#2E7D32' },
                ]}
              >
                {item.stock}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AllItems;

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headingText: {
    fontWeight: '500',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  itemText: {
    fontWeight: '400',
    fontSize: 14,
  },
});
