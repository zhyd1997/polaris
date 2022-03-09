import vscode from 'vscode';
import {getCustomPropertyNames} from '../../../utils/custom-properties';

export class PolarisAutocomplete implements vscode.CompletionItemProvider {
  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext,
  ): Promise<vscode.CompletionItem[] | null | undefined> {
    // iterate over all tokens and create completion items
    const completionItems = getCustomPropertyNames().map((token) => {
      const autocompleteValue = `var(${token})`;
      return new vscode.CompletionItem(
        autocompleteValue,
        vscode.CompletionItemKind.Value,
      );
    });

    return completionItems;
  }
}
