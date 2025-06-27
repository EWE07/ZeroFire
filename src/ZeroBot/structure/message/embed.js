const { EmbedBuilder } = require("discord.js");


class ZeroEmbed extends EmbedBuilder {
    constructor(data = {}) {
        super(data);
    }

    fields() {
        return this.data.fields || [];
    }
    setFields(fields) {
        this.data.fields = fields;
        return this;
    }

    footer() {
        return this.data.footer || {};
    }
    setFooter(footer) {
        this.data.footer = footer;
        return this;
    }

    title() {
        return this.data.title || '';
    }
    setTitle(title) {
        this.data.title = title;
        return this;
    }

    description() {
        return this.data.description || '';
    }
    setDescription(description) {
        this.data.description = description;
        return this;
    }

    url() {
        return this.data.url || '';
    }
    setUrl(url) {
        this.data.url = url;
        return this;
    }

    color() {
        return this.data.color || null;
    }
    setColor(color) {
        this.data.color = color;
        return this;
    }

    hexColor() {
        return this.data.hexColor || null;
    }
    setHexColor(hexColor) {
        this.data.hexColor = hexColor;
        return this;
    }

    timestamp() {
        return this.data.timestamp || null;
    }
    setTimestamp(timestamp) {
        this.data.timestamp = timestamp;
        return this;
    }

    thumbnail() {
        return this.data.thumbnail || {};
    }
    setThumbnail(thumbnail) {
        this.data.thumbnail = thumbnail;
        return this;
    }

    image() {
        return this.data.image || {};
    }
    setImage(image) {
        this.data.image = image;
        return this;
    }

    author() {
        return this.data.author || {};
    }
    setAuthor(author) {
        this.data.author = author;
        return this;
    }

    provider() {
        return this.data.provider || {};
    }
    setProvider(provider) {
        this.data.provider = provider;
        return this;
    }

    video() {
        return this.data.video || {};
    }
    setVideo(video) {
        this.data.video = video;
        return this;
    }

    length() {
        return this.data.length || null;
    }
    setLength(length) {
        this.data.length = length;
        return this;
    }

}

module.exports = ZeroEmbed;