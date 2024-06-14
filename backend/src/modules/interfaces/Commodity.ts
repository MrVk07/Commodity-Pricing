export interface ICommodityCategory {
    fetchDate: Date;
    Name: string;
    Items: [ICommodityItem]
}

export interface ICommodityItem {
    Name: string;
    Image: string;
    Category: string;
    Costliest_Market: string;
    Costliest_Market_Price: string;
    Costliest_Market_State: string;
    Cheapest_Market: string;
    Cheapest_Market_Price: string;
    Cheapest_Market_State: string;
    Latest_Price_Date: Date;
}
