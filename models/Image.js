
const {
    Model
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
      
    };
    Image.init({
      master_image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      resized_image_300: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      resized_image_600: {
        type: DataTypes.BOOLEAN,
        default: true
      }
    }, {
      sequelize,
      modelName: 'Image',
      tableName: 'images',
      updatedAt: 'updated_on',
		  createdAt: 'created_on',
      timestamps: true
    });
    return Image;
  };