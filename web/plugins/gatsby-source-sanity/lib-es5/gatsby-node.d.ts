import { GatsbyNode, PluginOptions } from 'gatsby';
export interface PluginConfig extends PluginOptions {
    projectId: string;
    dataset: string;
    token?: string;
    version?: string;
    graphqlTag: string;
    overlayDrafts?: boolean;
    watchMode?: boolean;
}
export declare const onPreInit: GatsbyNode['onPreInit'];
export declare const onPreBootstrap: GatsbyNode['onPreBootstrap'];
export declare const createResolvers: GatsbyNode['createResolvers'];
export declare const createSchemaCustomization: GatsbyNode['createSchemaCustomization'];
export declare const sourceNodes: GatsbyNode['sourceNodes'];
export declare const setFieldsOnGraphQLNodeType: GatsbyNode['setFieldsOnGraphQLNodeType'];
