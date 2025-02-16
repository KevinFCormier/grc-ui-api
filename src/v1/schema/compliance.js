/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ******************************************************************************* */
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import { gql } from 'apollo-server-express';
import ComplianceModel from '../models/compliance';

export const typeDef = gql`
type Compliance implements K8sObject {
  clusterCompliant: String
  clusterNS: JSON
  clusterConsoleURL: JSON
  compliancePolicies: [CompliancePolicies]
  compliancePolicy: [CompliancePolicyDetail]
  complianceStatus: [CompliantStatus]
  metadata: Metadata
  policyCompliant: String
  raw: JSON
  annotations: JSON
  placementPolicies: [PlacementPolicy]
  placementBindings: [PlacementBinding]
  name: String
  namespace: String
  remediation: String
  clusters: [String]
  allTemplates: [MixedTemplate]
}

# Placement Schemas
type PlacementPolicy implements K8sObject {
  clusterLabels: JSON
  metadata: Metadata
  # The object's yaml definition in JSON format.
  raw: JSON
  status: JSON
}

type PlacementBinding implements K8sObject {
  metadata: Metadata
  # The object's yaml definition in JSON format.
  raw: JSON
  placementRef: Subject
  subjects: [Subject]
}

type Subject {
  apiGroup: String
  kind: String
  name: String
}

type CompliantStatus {
  clusterNamespace: String
  localCompliantStatus: String
  localValidStatus: String
  compliant: String
}

type CompliancePolicies {
  name: String
  complianceName: String
  complianceNamespace: String
  clusterCompliant: [String]
  clusterNotCompliant: [String]
  policies: [CompliancePolicy]
}

type CompliancePolicyDetail {
  name: String
  complianceName: String
  complianceNamespace: String
  complianceSelfLink: String
  raw: JSON
  message: String
  detail: JSON
  status: String
  remediation: String
  rules: [PolicyRules]
  roleTemplates: [PolicyTemplate]
  roleBindingTemplates: [PolicyTemplate]
  objectTemplates: [PolicyTemplate]
  policyTemplates: [PolicyTemplate]
}

type CompliancePolicy implements K8sObject {
  cluster: String
  complianceName: String
  detail: JSON
  complianceNamespace: String
  compliant: String
  # Possible values are: enforce, inform
  remediation: String
  metadata: Metadata
  name: String @deprecated(reason: "Use metadata.name field.")
  rules: [PolicyRules]
  status: String
  templates: [PolicyTemplate]
  valid: String
  violations: [Violations]
  roleTemplates: [PolicyTemplate]
  roleBindingTemplates: [PolicyTemplate]
  objectTemplates: [PolicyTemplate]
  policyTemplates: [PolicyTemplate]
  raw: JSON
  message: String
}

type MixedTemplate {
  apiVersion: String
  complianceType: String
  metadata: JSON
  rules: JSON
  selector: JSON
  status: JSON
  templateType: String
  objectDefinition: JSON
}

`;

export const resolver = {
  Query: {
    compliances: (root, args, { complianceModel }) => complianceModel.getCompliances(args.name, args.namespace),
  },
  Compliance: {
    compliancePolicies: (parent) => ComplianceModel.resolveCompliancePolicies(parent),
    compliancePolicy: (parent) => ComplianceModel.resolveCompliancePolicy(parent),
    complianceStatus: (parent) => ComplianceModel.resolveComplianceStatus(parent),
    policyCompliant: (parent) => ComplianceModel.resolvePolicyCompliant(parent),
    clusterCompliant: (parent) => ComplianceModel.resolveClusterCompliant(parent),
    annotations: (parent) => ComplianceModel.resolveAnnotations(parent),
    placementPolicies: (parent, args, { complianceModel }) => complianceModel.getPlacementRulesFromParent(parent),
    placementBindings: (parent, args, { complianceModel }) => complianceModel.getPlacementBindingsFromParent(parent),
  },
  Mutation: {
    deleteCompliance: (root, args, { complianceModel }) => complianceModel.deleteCompliance(args),
  },
};
