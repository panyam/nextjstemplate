import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import { Paginator } from "../components/Paginator";
import { Collection } from "../entities/collections";
import { CollectionApi } from "../../client/pages/apis/CollectionApi";
import styles from "../styles/Home.module.scss";
import { CollectionListView } from "../components/CollectionListView";
import collectionStyles from "../components/CollectionListView/SingleColView.module.scss";
import paginatorStyles from "../components/Paginator/view.module.scss";
import BaseComponent from "../components/BaseComponent";

export default class Home extends BaseComponent<any>{
  apiClient = new CollectionApi("http://localhost:3000");
  state: any;
  collectionListViewRef = React.createRef<CollectionListView>();
  paginatorRef = React.createRef<Paginator<Collection>>();
  constructor(props: any, context: any) {
    super(props, context)
    this.state = {
    };
  }

  render() {
    return (
      <main>
        <Header showLoginButton={true} hideHomeButton={true} showLogoutButton={true}
                styles={styles} showSearchButton ={true}
                extraMenuItems={[]} />
        <CollectionListView
          styles={collectionStyles}
          ref={this.collectionListViewRef}
          onDelete={this.onDelete.bind(this)} 
        />
        <Paginator styles={paginatorStyles} ref={this.paginatorRef}
                   loader={this.load.bind(this)}
                   onLoaded={
            (results: Collection[]) => {
              this.collectionListViewRef.current?.setCollections(results);
            }
          } />
      </main>
    );
  }

  componentDidMount() {
    this.paginatorRef.current?.load(0)
  }

  onDelete(collection: Collection) {
    console.log("Delete Collection: ", collection);
  }

  load(offset: number, count: number): Promise<Collection[]> {
    const loggedInUser = this.loggedInUser || {};
    return this.apiClient.list({
      // userId: loggedInUser || "",
      offset: offset,
      count: count,
      //   orderBy: this.orderBy,
    });
  }
}
