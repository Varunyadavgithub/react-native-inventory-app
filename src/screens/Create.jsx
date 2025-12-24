import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';

const Create = ({ data, setData }) => {
  const [itemName, setItemName] = useState('');
  const [stockQty, setStockQty] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Add or update item
  const addItemHandler = () => {
    if (!itemName || !stockQty) return;

    if (isEdit) {
      // Update existing item
      setData(
        data.map(item =>
          item.id === editId
            ? { ...item, name: itemName, stock: parseInt(stockQty) }
            : item,
        ),
      );
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        name: itemName,
        stock: parseInt(stockQty),
      };
      setData([...data, newItem]);
    }

    setItemName('');
    setStockQty('');
    setIsEdit(false);
    setEditId(null);
  };

  // Delete item
  const deleteItemHandler = id => {
    setData(data.filter(item => item.id !== id));
  };

  // Edit item
  const editItemHandler = item => {
    setIsEdit(true);
    setEditId(item.id);
    setItemName(item.name);
    setStockQty(item.stock.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEdit ? 'Edit Item' : 'Add New Item'}</Text>

      <TextInput
        placeholder="Enter item name"
        placeholderTextColor="#999"
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
      />

      <TextInput
        placeholder="Enter stock quantity"
        placeholderTextColor="#999"
        style={styles.input}
        value={stockQty}
        onChangeText={setStockQty}
        keyboardType="numeric"
      />

      <Pressable style={styles.button} onPress={addItemHandler}>
        <Text style={styles.buttonText}>
          {isEdit ? 'Update Item' : 'Add Item'}
        </Text>
      </Pressable>

      <Text style={styles.headingText}>All Items in Stock</Text>

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
              <View style={styles.actionsContainer}>
                <Text
                  style={[
                    styles.itemText,
                    { color: isLowStock ? '#D32F2F' : '#2E7D32' },
                  ]}
                >
                  {item.stock}
                </Text>
                <Pressable onPress={() => editItemHandler(item)}>
                  <Text style={styles.editText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => deleteItemHandler(item.id)}>
                  <Text
                    style={[
                      styles.deleteText,
                      { color: isLowStock ? '#D32F2F' : '#2E7D32' },
                    ]}
                  >
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C8E6C9',
    backgroundColor: '#F9FFFA',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  headingText: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  itemText: {
    fontWeight: '500',
    fontSize: 15,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  editText: {
    color: '#1976D2',
    fontWeight: '500',
  },
  deleteText: {
    fontWeight: '500',
  },
});
