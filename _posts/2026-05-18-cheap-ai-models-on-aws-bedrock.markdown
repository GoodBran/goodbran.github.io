---
layout: post
title: "Cheap AI Models on AWS Bedrock: A Small Email Classification Test"
date: 2026-05-18 12:00:00 +0800
category: code
description: "A quick AWS Bedrock experiment comparing low-cost models on a simple email subject classification task."
cover_image: "/assets/images/cheap-ai-models-on-aws-bedrock-cover.webp"
---

This is a simple experiment classifying 20 email subjects using cheap AI models available on AWS Bedrock. The goal is to see how they perform on a basic, high-volume production task.

## Models Tested

| Model | Bedrock ID | Input / 1M | Output / 1M |
| --- | --- | ---: | ---: |
| MiniMax M2.5 | `minimax.minimax-m2.5` | $0.30 | $1.20 |
| Google Gemma 3 12B IT | `google.gemma-3-12b-it` | $0.09 | $0.29 |
| Google Gemma 3 4B IT | `google.gemma-3-4b-it` | $0.09 | $0.29 |
| Ministral 14B 3.0 | `mistral.ministral-3-14b-instruct` | $0.20 | $0.20 |
| Claude Haiku 4.5 | `us.anthropic.claude-haiku-4-5-20251001-v1:0` | $1.00 | $5.00 |

## Summary

| Model | Accuracy | Input Tokens | Output Tokens | Estimated Cost |
| --- | ---: | ---: | ---: | ---: |
| Ministral 14B 3.0 | 20/20 | 8,078 | 505 | $0.001717 |
| Claude Haiku 4.5 | 20/20 | 20,845 | 1,127 | $0.026480 |
| MiniMax M2.5 | 19/20 | 10,310 | 4,489 | $0.008480 |
| Google Gemma 3 12B IT | 18/20 | 4,146 | 263 | $0.000449 |
| Google Gemma 3 4B IT | 17/20 | 4,146 | 256 | $0.000447 |

## Takeaways

- **Ministral 14B** offers the best balance of cost and perfect accuracy for this task.

## Raw Results

```text
MiniMax M2.5 (minimax.minimax-m2.5)
--------------------------------------------------------------------------------
 1. PASS Invoice for April Campaign Spend                     expected=Finance / Invoice                            actual=Finance / Invoice
 2. PASS Billing Confirmation - May Media Buy                 expected=Finance / Billing Confirmation               actual=Finance / Billing Confirmation
 3. PASS Payment Received for March Invoice                   expected=Finance / Payment Received                   actual=Finance / Payment Received
 4. PASS Vendor Payout Summary - Q2                           expected=Finance / Vendor Payout                      actual=Finance / Vendor Payout
 5. PASS Overdue Payment Reminder for April Invoice           expected=Finance / Overdue Payment                    actual=Finance / Overdue Payment
 6. PASS Campaign Launch - ABC App - US Android               expected=Campaign / Launch                            actual=Campaign / Launch
 7. PASS Relaunch Request for iOS Campaign                    expected=Campaign / Relaunch                          actual=Campaign / Relaunch
 8. PASS Campaign Adjustment: Increase Daily Cap              expected=Campaign / Adjustment                        actual=Campaign / Adjustment
 9. PASS Pause Notice - Low ROAS Campaign                     expected=Campaign / Pause Notice                      actual=Campaign / Pause Notice
10. PASS New Campaign Opportunity - Finance App               expected=Campaign / Opportunity                       actual=Campaign / Opportunity
11. PASS Scheduled Performance Report - Weekly Summary        expected=Reporting / Scheduled Report                 actual=Reporting / Scheduled Report
12. PASS Query Failed for Scheduled Report                    expected=Reporting / Report Failure                   actual=Reporting / Report Failure
13. PASS Ad Spend Upload Status - May 2026                    expected=Reporting / Upload Status                    actual=Reporting / Upload Status
14. PASS Monthly Campaign Performance Dashboard               expected=Reporting / Performance Dashboard            actual=Reporting / Performance Dashboard
15. PASS Tracking Link Update Required                        expected=Technical / Tracking Link                    actual=Technical / Tracking Link
16. PASS Missing Events in AppsFlyer                          expected=Technical / Missing Events                   actual=Technical / Missing Events
17. PASS Impression Link Update for New Creative              expected=Technical / Impression Link                  actual=Technical / Impression Link
18. PASS Postback Issue on Android Campaign                   expected=Technical / Postback Issue                   actual=Technical / Postback Issue
19. FAIL Meeting Follow-Up from Business of Apps              expected=Other / Admin / Meeting Follow-Up            actual=nil
20. PASS Test Email - Please Ignore                           expected=Other / Admin / Test / Noise                 actual=Other / Admin / Test / Noise
Accuracy: 19/20
Tokens: input=10310, output=4489
Estimated cost: $0.008480

Google Gemma 3 12B IT (google.gemma-3-12b-it)
--------------------------------------------------------------------------------
 1. PASS Invoice for April Campaign Spend                     expected=Finance / Invoice                            actual=Finance / Invoice
 2. PASS Billing Confirmation - May Media Buy                 expected=Finance / Billing Confirmation               actual=Finance / Billing Confirmation
 3. PASS Payment Received for March Invoice                   expected=Finance / Payment Received                   actual=Finance / Payment Received
 4. PASS Vendor Payout Summary - Q2                           expected=Finance / Vendor Payout                      actual=Finance / Vendor Payout
 5. PASS Overdue Payment Reminder for April Invoice           expected=Finance / Overdue Payment                    actual=Finance / Overdue Payment
 6. PASS Campaign Launch - ABC App - US Android               expected=Campaign / Launch                            actual=Campaign / Launch
 7. PASS Relaunch Request for iOS Campaign                    expected=Campaign / Relaunch                          actual=Campaign / Relaunch
 8. PASS Campaign Adjustment: Increase Daily Cap              expected=Campaign / Adjustment                        actual=Campaign / Adjustment
 9. PASS Pause Notice - Low ROAS Campaign                     expected=Campaign / Pause Notice                      actual=Campaign / Pause Notice
10. PASS New Campaign Opportunity - Finance App               expected=Campaign / Opportunity                       actual=Campaign / Opportunity
11. PASS Scheduled Performance Report - Weekly Summary        expected=Reporting / Scheduled Report                 actual=Reporting / Scheduled Report
12. PASS Query Failed for Scheduled Report                    expected=Reporting / Report Failure                   actual=Reporting / Report Failure
13. PASS Ad Spend Upload Status - May 2026                    expected=Reporting / Upload Status                    actual=Reporting / Upload Status
14. PASS Monthly Campaign Performance Dashboard               expected=Reporting / Performance Dashboard            actual=Reporting / Performance Dashboard
15. PASS Tracking Link Update Required                        expected=Technical / Tracking Link                    actual=Technical / Tracking Link
16. PASS Missing Events in AppsFlyer                          expected=Technical / Missing Events                   actual=Technical / Missing Events
17. PASS Impression Link Update for New Creative              expected=Technical / Impression Link                  actual=Technical / Impression Link
18. PASS Postback Issue on Android Campaign                   expected=Technical / Postback Issue                   actual=Technical / Postback Issue
19. FAIL Meeting Follow-Up from Business of Apps              expected=Other / Admin / Meeting Follow-Up            actual=nil
20. FAIL Test Email - Please Ignore                           expected=Other / Admin / Test / Noise                 actual=nil
Accuracy: 18/20
Tokens: input=4146, output=263
Estimated cost: $0.000449

Google Gemma 3 4B IT (google.gemma-3-4b-it)
--------------------------------------------------------------------------------
 1. PASS Invoice for April Campaign Spend                     expected=Finance / Invoice                            actual=Finance / Invoice
 2. PASS Billing Confirmation - May Media Buy                 expected=Finance / Billing Confirmation               actual=Finance / Billing Confirmation
 3. PASS Payment Received for March Invoice                   expected=Finance / Payment Received                   actual=Finance / Payment Received
 4. PASS Vendor Payout Summary - Q2                           expected=Finance / Vendor Payout                      actual=Finance / Vendor Payout
 5. PASS Overdue Payment Reminder for April Invoice           expected=Finance / Overdue Payment                    actual=Finance / Overdue Payment
 6. PASS Campaign Launch - ABC App - US Android               expected=Campaign / Launch                            actual=Campaign / Launch
 7. PASS Relaunch Request for iOS Campaign                    expected=Campaign / Relaunch                          actual=Campaign / Relaunch
 8. PASS Campaign Adjustment: Increase Daily Cap              expected=Campaign / Adjustment                        actual=Campaign / Adjustment
 9. PASS Pause Notice - Low ROAS Campaign                     expected=Campaign / Pause Notice                      actual=Campaign / Pause Notice
10. PASS New Campaign Opportunity - Finance App               expected=Campaign / Opportunity                       actual=Campaign / Opportunity
11. PASS Scheduled Performance Report - Weekly Summary        expected=Reporting / Scheduled Report                 actual=Reporting / Scheduled Report
12. PASS Query Failed for Scheduled Report                    expected=Reporting / Report Failure                   actual=Reporting / Report Failure
13. PASS Ad Spend Upload Status - May 2026                    expected=Reporting / Upload Status                    actual=Reporting / Upload Status
14. PASS Monthly Campaign Performance Dashboard               expected=Reporting / Performance Dashboard            actual=Reporting / Performance Dashboard
15. PASS Tracking Link Update Required                        expected=Technical / Tracking Link                    actual=Technical / Tracking Link
16. PASS Missing Events in AppsFlyer                          expected=Technical / Missing Events                   actual=Technical / Missing Events
17. FAIL Impression Link Update for New Creative              expected=Technical / Impression Link                  actual=nil
18. PASS Postback Issue on Android Campaign                   expected=Technical / Postback Issue                   actual=Technical / Postback Issue
19. FAIL Meeting Follow-Up from Business of Apps              expected=Other / Admin / Meeting Follow-Up            actual=nil
20. FAIL Test Email - Please Ignore                           expected=Other / Admin / Test / Noise                 actual=nil
Accuracy: 17/20
Tokens: input=4146, output=256
Estimated cost: $0.000447

Ministral 14B 3.0 (mistral.ministral-3-14b-instruct)
--------------------------------------------------------------------------------
 1. PASS Invoice for April Campaign Spend                     expected=Finance / Invoice                            actual=Finance / Invoice
 2. PASS Billing Confirmation - May Media Buy                 expected=Finance / Billing Confirmation               actual=Finance / Billing Confirmation
 3. PASS Payment Received for March Invoice                   expected=Finance / Payment Received                   actual=Finance / Payment Received
 4. PASS Vendor Payout Summary - Q2                           expected=Finance / Vendor Payout                      actual=Finance / Vendor Payout
 5. PASS Overdue Payment Reminder for April Invoice           expected=Finance / Overdue Payment                    actual=Finance / Overdue Payment
 6. PASS Campaign Launch - ABC App - US Android               expected=Campaign / Launch                            actual=Campaign / Launch
 7. PASS Relaunch Request for iOS Campaign                    expected=Campaign / Relaunch                          actual=Campaign / Relaunch
 8. PASS Campaign Adjustment: Increase Daily Cap              expected=Campaign / Adjustment                        actual=Campaign / Adjustment
 9. PASS Pause Notice - Low ROAS Campaign                     expected=Campaign / Pause Notice                      actual=Campaign / Pause Notice
10. PASS New Campaign Opportunity - Finance App               expected=Campaign / Opportunity                       actual=Campaign / Opportunity
11. PASS Scheduled Performance Report - Weekly Summary        expected=Reporting / Scheduled Report                 actual=Reporting / Scheduled Report
12. PASS Query Failed for Scheduled Report                    expected=Reporting / Report Failure                   actual=Reporting / Report Failure
13. PASS Ad Spend Upload Status - May 2026                    expected=Reporting / Upload Status                    actual=Reporting / Upload Status
14. PASS Monthly Campaign Performance Dashboard               expected=Reporting / Performance Dashboard            actual=Reporting / Performance Dashboard
15. PASS Tracking Link Update Required                        expected=Technical / Tracking Link                    actual=Technical / Tracking Link
16. PASS Missing Events in AppsFlyer                          expected=Technical / Missing Events                   actual=Technical / Missing Events
17. PASS Impression Link Update for New Creative              expected=Technical / Impression Link                  actual=Technical / Impression Link
18. PASS Postback Issue on Android Campaign                   expected=Technical / Postback Issue                   actual=Technical / Postback Issue
19. PASS Meeting Follow-Up from Business of Apps              expected=Other / Admin / Meeting Follow-Up            actual=Other / Admin / Meeting Follow-Up
20. PASS Test Email - Please Ignore                           expected=Other / Admin / Test / Noise                 actual=Other / Admin / Test / Noise
Accuracy: 20/20
Tokens: input=8078, output=505
Estimated cost: $0.001717

Haiku 4.5 (us.anthropic.claude-haiku-4-5-20251001-v1:0)
--------------------------------------------------------------------------------
 1. PASS Invoice for April Campaign Spend                     expected=Finance / Invoice                            actual=Finance / Invoice
 2. PASS Billing Confirmation - May Media Buy                 expected=Finance / Billing Confirmation               actual=Finance / Billing Confirmation
 3. PASS Payment Received for March Invoice                   expected=Finance / Payment Received                   actual=Finance / Payment Received
 4. PASS Vendor Payout Summary - Q2                           expected=Finance / Vendor Payout                      actual=Finance / Vendor Payout
 5. PASS Overdue Payment Reminder for April Invoice           expected=Finance / Overdue Payment                    actual=Finance / Overdue Payment
 6. PASS Campaign Launch - ABC App - US Android               expected=Campaign / Launch                            actual=Campaign / Launch
 7. PASS Relaunch Request for iOS Campaign                    expected=Campaign / Relaunch                          actual=Campaign / Relaunch
 8. PASS Campaign Adjustment: Increase Daily Cap              expected=Campaign / Adjustment                        actual=Campaign / Adjustment
 9. PASS Pause Notice - Low ROAS Campaign                     expected=Campaign / Pause Notice                      actual=Campaign / Pause Notice
10. PASS New Campaign Opportunity - Finance App               expected=Campaign / Opportunity                       actual=Campaign / Opportunity
11. PASS Scheduled Performance Report - Weekly Summary        expected=Reporting / Scheduled Report                 actual=Reporting / Scheduled Report
12. PASS Query Failed for Scheduled Report                    expected=Reporting / Report Failure                   actual=Reporting / Report Failure
13. PASS Ad Spend Upload Status - May 2026                    expected=Reporting / Upload Status                    actual=Reporting / Upload Status
14. PASS Monthly Campaign Performance Dashboard               expected=Reporting / Performance Dashboard            actual=Reporting / Performance Dashboard
15. PASS Tracking Link Update Required                        expected=Technical / Tracking Link                    actual=Technical / Tracking Link
16. PASS Missing Events in AppsFlyer                          expected=Technical / Missing Events                   actual=Technical / Missing Events
17. PASS Impression Link Update for New Creative              expected=Technical / Impression Link                  actual=Technical / Impression Link
18. PASS Postback Issue on Android Campaign                   expected=Technical / Postback Issue                   actual=Technical / Postback Issue
19. PASS Meeting Follow-Up from Business of Apps              expected=Other / Admin / Meeting Follow-Up            actual=Other / Admin / Meeting Follow-Up
20. PASS Test Email - Please Ignore                           expected=Other / Admin / Test / Noise                 actual=Other / Admin / Test / Noise
Accuracy: 20/20
Tokens: input=20845, output=1127
Estimated cost: $0.026480
```
